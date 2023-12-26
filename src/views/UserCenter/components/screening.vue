// 个人图书馆筛选框的组件
<template>
    <div>
        <div class="tags">
            <el-card class="screening-card"
                onmouseover="this.style.scale='1.1'; this.style.background='linear-gradient(to bottom right, #fafafa, rgb(200, 65, 48))';"
                onmouseout="this.style.scale='1.0'; this.style.background='linear-gradient(to bottom right, #fafafa 85%,  rgba(200, 65, 48, 0.75))';">
                <span style="font-weight: bold;">收藏夹</span>
                <el-divider />
                <el-tag type="info" v-for="tag in dynamicTags" :key="tag" class="mx-1"
                    :class="{ 'active-tag': activeName === tag }" closable :disable-transitions="false"
                    @close="handleClose(tag)" @click="selectTag(tag)" style="background-color: white;">
                    {{ tag.name }}
                </el-tag>
                <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="input-new-tag" size="small"
                    @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" style="background-color: white;" />
                <el-button v-else class="button-new-tag" size="small" @click="showInput" style="background-color: white;">
                    + 新建收藏夹
                </el-button>
            </el-card>
        </div>
        <el-dialog v-model="deleteDialogVisible" title="删除标签" width="30%">
            <span>确定要删除“{{ closingTag.name }}”标签吗？删除后相关文章将被取消收藏。</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="deleteTag">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="noDeleteVisible" title="删除标签" width="30%">
            <span>无法删除默认收藏夹！</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="noDeleteVisible = false">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, onBeforeMount, onMounted, reactive, ref } from 'vue'
import { ElInput, ElMessage } from 'element-plus'
import httpInstance from '@/utils/http'
import { ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
import { useLibraryStore } from '@/stores/library'
import axios from 'axios'
const userStore = useUserStore()
const libraryStore = useLibraryStore()
const userId = userStore.userInfo.userid

const inputValue = ref('')
const dynamicTags = reactive([])
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()

const loadTags = () => {
    httpInstance.post("/label_star_get_all", {
        userid: userStore.userInfo.userid
    }).then((res) => {
        console.log(res)
        dynamicTags.splice(0, dynamicTags.length, ...res.results)
        if (dynamicTags.length === 0) {
            // 创建默认收藏夹
            httpInstance.post("label_star_add", {
                userid: userId,
                name: "默认收藏夹"
            }).then((res) => {
                dynamicTags.push(res.label[0])
            }).then(() => {
                selectTag(Reflect.get(dynamicTags, 0))
            })
        }
        selectTag(Reflect.get(dynamicTags, 0)) // 默认选择默认收藏夹
    })
}

//关闭标签：删除后其中的article也被删除
const deleteDialogVisible = ref(false)
const noDeleteVisible = ref(false)
var closingTag = ''
const handleClose = (tag: string) => {
    closingTag = tag
    if (dynamicTags.indexOf(tag) == 0) {
        // 默认收藏夹
        noDeleteVisible.value = true
    } else {
        deleteDialogVisible.value = true
    }
}
const deleteTag = () => {
    let tag = dynamicTags[dynamicTags.indexOf(closingTag)]
    dynamicTags.splice(dynamicTags.indexOf(closingTag), 1)
    deleteDialogVisible.value = false
    httpInstance.post("/label_delete", {
        userid: userId,
        id: tag.id,
        isDelete: 1
    }).then((res) => {
        console.log("res")
    })
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        if (inputValue.value.length > 10) {
            ElMessage({
                message: "收藏夹命名不能超过10个字符",
                type: 'warning',
            })
        } else {
            httpInstance.post("label_star_add", {
                userid: userId,
                name: inputValue.value
            }).then((res) => {
                console.log(res)
                if (res.msg === "标签重名") {
                    ElMessage({
                        message: "收藏夹已存在!",
                        type: 'error',
                    })
                } else {
                    dynamicTags.push(res.label[0])
                }
            })
        }
    }
    inputVisible.value = false
    inputValue.value = ''
}

const activeName = ref()
const selectTag = (tag: string) => {
    console.log("选择了标签：" + tag.id);
    activeName.value = tag;
    libraryStore.labelId = tag.id;
    libraryStore.labelName = tag.name;
}


onBeforeMount(() => {
    loadTags()
})
</script>

<style>
.screening-card {
    margin: 5%;
    min-height: 100px;
    border-radius: 20px;
    /* background-color: rgb(200, 65, 48, 0.75); */
    background: linear-gradient(to bottom right, #fafafa 85%, rgba(200, 65, 48, 0.75));
    transition: all 0.3s;
}

.screening-card :hover {
    /* background-color: rgb(200, 65, 48, 0.75); */
    /* background: linear-gradient(to bottom right, white, rgb(200, 65, 48)); */
    transition: all 0.3s;
}

.screening-card div :hover {
    background-color: rgba(0, 0, 0, 0);
}

.mx-1 {
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

.button-new-tag {
    margin-right: 10px;
    margin-bottom: 10px;
    width: 100px;
}

.input-new-tag {
    width: 100px;
    margin-right: 10px;
    margin-bottom: 10px;
}

.active-tag {
    background-color: #cfd2d5;
    /* 标签被选中后的颜色 */
}
</style>