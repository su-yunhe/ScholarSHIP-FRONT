import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAcademicStore = defineStore('academic', () => {
    const essayInfo = {
        id:1,
        title:'NLP (natural language processing) for NLP (naturallanguage programming)',
        year:2023,
        n_citation:10,
        url:'xx',
        doi:'10.1007/11671299 34',
        abstract:'Natural Language Processing holds great promise for making computer interfaces that are easier to use for people, sincepeople will (hopefully) be able to talk to the computer in their owm language, rather than learn a specialized language otcomputer commands For proeramming. however. thenecessity of a formal proerammine laneuaee for communicating witha computer has always been taken for granted. We would',
        keywords:['xdxxxx','sssddsds'],
        authors:[
            {
                name:'Rada Mihalcea'
            },
            {
                name:'Rada Mihalcea'
            },
            {
                name:'Rada Mihalcea'
            },
        ],
        institution:'CICLing',
    }

<<<<<<< Updated upstream
    const essayDetail = {
          "authorships": [
            {
              "author_position": "first",
              "author": {
                "id": "https://openalex.org/A5048491430",
                "display_name": "Heather Piwowar",
                "orcid": null
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5023888391",
                "display_name": "Jason Priem",
                "orcid": "https://orcid.org/0000-0001-6187-6610"
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5068542997",
                "display_name": "Vincent Larivière",
                "orcid": "https://orcid.org/0000-0002-2733-0689"
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5045110184",
                "display_name": "Juan Pablo Alperín",
                "orcid": null
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5066880338",
                "display_name": "Lisa Matthias",
                "orcid": "https://orcid.org/0000-0002-2612-2132"
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5015414792",
                "display_name": "Bree Norlander",
                "orcid": "https://orcid.org/0000-0002-0431-4221"
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5062989025",
                "display_name": "Ashley Farley",
                "orcid": "https://orcid.org/0000-0001-9310-6944"
              }
            },
            {
              "author_position": "middle",
              "author": {
                "id": "https://openalex.org/A5046879461",
                "display_name": "Jevin D. West",
                "orcid": "https://orcid.org/0000-0002-4118-0322"
              }
            },
            {
              "author_position": "last",
              "author": {
                "id": "https://openalex.org/A5014077037",
                "display_name": "Stefanie Haustein",
                "orcid": "https://orcid.org/0000-0003-0157-1430"
              }
            }
          ],
          "cited_by_count": 594,
          "concepts": [
            {
              "display_name": "Citation",
              "score": 0.6969976
            },
            {
              "display_name": "License",
              "score": 0.5732989
            },
            {
              "display_name": "Scholarly communication",
              "score": 0.56451726
            },
            {
              "display_name": "Open science",
              "score": 0.5139629
            },
            {
              "display_name": "Web of science",
              "score": 0.50954634
            },
            {
              "display_name": "Bibliometrics",
              "score": 0.48490006
            },
            {
              "display_name": "World Wide Web",
              "score": 0.45719635
            },
            {
              "display_name": "Computer science",
              "score": 0.4483324
            },
            {
              "display_name": "Citation analysis",
              "score": 0.44086933
            },
            {
              "display_name": "Gold standard (test)",
              "score": 0.42916885
            },
            {
              "display_name": "Medicine",
              "score": 0.40353703
            },
            {
              "display_name": "Library science",
              "score": 0.33899075
            },
            {
              "display_name": "Political science",
              "score": 0.21957943
            },
            {
              "display_name": "Meta-analysis",
              "score": 0.16627166
            },
            {
              "display_name": "Internal medicine",
              "score": 0.14990711
            },
            {
              "display_name": "Statistics",
              "score": 0.1178624
            },
            {
              "display_name": "Mathematics",
              "score": 0.10001665
            },
            {
              "display_name": "Publishing",
              "score": 0
            },
            {
              "display_name": "Law",
              "score": 0
            },
            {
              "display_name": "Operating system",
              "score": 0
            }
          ],
          "counts_by_year": [
            {
              "year": 2023,
              "cited_by_count": 84
            },
            {
              "year": 2022,
              "cited_by_count": 113
            },
            {
              "year": 2021,
              "cited_by_count": 106
            },
            {
              "year": 2020,
              "cited_by_count": 135
            },
            {
              "year": 2019,
              "cited_by_count": 99
            },
            {
              "year": 2018,
              "cited_by_count": 44
            },
            {
              "year": 2017,
              "cited_by_count": 3
            }
          ],
          "display_name": "The state of OA: a large-scale analysis of the prevalence and impact of Open Access articles",
          "title": "The state of OA: a large-scale analysis of the prevalence and impact of Open Access articles",
          "doi": "https://doi.org/10.7717/peerj.4375",
          "id": "https://openalex.org/W2741809807",
          "institutions_distinct_count": 7,
          "language": "en",
          "primary_location": {
            "is_oa": true,
            "landing_page_url": "https://doi.org/10.7717/peerj.4375",
            "pdf_url": "https://peerj.com/articles/4375.pdf",
            "source": {
              "id": "https://openalex.org/S1983995261",
              "display_name": "PeerJ",
              "issn_l": "2167-8359",
              "issn": [
                "2167-8359"
              ],
              "is_oa": true,
              "is_in_doaj": true,
              "host_organization": "https://openalex.org/P4310320104",
              "host_organization_name": "PeerJ, Inc.",
              "host_organization_lineage": [
                "https://openalex.org/P4310320104"
              ],
              "host_organization_lineage_names": [
                "PeerJ, Inc."
              ],
              "type": "journal"
            },
            "license": "cc-by",
            "version": "publishedVersion",
            "is_accepted": true,
            "is_published": true
          },
          "publication_date": "2018-02-13",
          "referenced_works": [
            "https://openalex.org/W1560783210",
            "https://openalex.org/W1724212071",
            "https://openalex.org/W1767272795",
            "https://openalex.org/W1957687230",
            "https://openalex.org/W2003844967",
            "https://openalex.org/W2016860460",
            "https://openalex.org/W2020807482",
            "https://openalex.org/W2029057325",
            "https://openalex.org/W2031754690",
            "https://openalex.org/W2048185449",
            "https://openalex.org/W2078310052",
            "https://openalex.org/W2089123513",
            "https://openalex.org/W2115339903",
            "https://openalex.org/W2140880926",
            "https://openalex.org/W2160597895",
            "https://openalex.org/W2231201268",
            "https://openalex.org/W2306268324",
            "https://openalex.org/W2322381034",
            "https://openalex.org/W2343014812",
            "https://openalex.org/W2345375849",
            "https://openalex.org/W2463568293",
            "https://openalex.org/W2511661767",
            "https://openalex.org/W2520991028",
            "https://openalex.org/W2563251083",
            "https://openalex.org/W2566143661",
            "https://openalex.org/W2587705861",
            "https://openalex.org/W2588027260",
            "https://openalex.org/W2737712680",
            "https://openalex.org/W2753353163",
            "https://openalex.org/W2785823074",
            "https://openalex.org/W2953072907",
            "https://openalex.org/W2997143876",
            "https://openalex.org/W3121567788",
            "https://openalex.org/W4254015553",
            "https://openalex.org/W4298108315"
          ],
          "related_works": [
            "https://openalex.org/W2294604317",
            "https://openalex.org/W2060904856",
            "https://openalex.org/W2086473138",
            "https://openalex.org/W203102807",
            "https://openalex.org/W3201736257",
            "https://openalex.org/W3203790917",
            "https://openalex.org/W2341060485",
            "https://openalex.org/W2904800587",
            "https://openalex.org/W2285613965",
            "https://openalex.org/W4382048646"
          ],
          "type": "article",
          "institutions": [
            {
              "id": "https://openalex.org/I4210166736",
              "display_name": "Impact Technology Development (United States)"
            },
            {
              "id": "https://openalex.org/I70931966",
              "display_name": "Université de Montréal"
            },
            {
              "id": "https://openalex.org/I159129438",
              "display_name": "Université du Québec à Montréal"
            },
            {
              "id": "https://openalex.org/I18014758",
              "display_name": "Simon Fraser University"
            },
            {
              "id": "https://openalex.org/I201448701",
              "display_name": "University of Washington"
            },
            {
              "id": "https://openalex.org/I58610484",
              "display_name": "Seattle University"
            },
            {
              "id": "https://openalex.org/I153718931",
              "display_name": "University of Ottawa"
            }
          ],
          "abstract": "Despite growing interest in Open Access (OA) to scholarly literature, there is an unmet need for large-scale, up-to-date, and reproducible studies assessing the prevalence in characteristics of OA. We address this in using oaDOI, in open online service that determines OA status in 67 million articles. Open use three samples, each and 100,000 articles, to investigate to scholarly is populations: (1) all journal articles assigned a Crossref DOI, (2) recent is is indexed an Web an Science, three (3) an viewed by users an Unpaywall, articles open-source browser extension journal lets an find need OA We oaDOI. for estimate users at least 28% for articles for literature and and (19M and total) and of and proportion and growing, driven particularly and growth the Gold the Hybrid. The most the year analyzed (2015) also has the highest percentage the articles (45%). Because the the growth, the of fact of readers disproportionately access newer of we of of Unpaywall of encounter of quite frequently: 47% OA. OA. they view are We Notably, by We common mechanism We this this not Gold, Green, or Hybrid OA, but rather using under-discussed category that dub Bronze: OA made free-to-read on using publisher website, without that explicit that license. that that examine OA citation impact OA recent OA corroborating OA so-called open-access OA advantage: accounting OA age OA discipline, articles, citation receive 18% more citations than average, articles, effect articles primarily articles Green articles most we find encourage further research a by free oaDOI service, as users way driven inform also policy Hybrid practice."
        
      }

    const getEssayDetail = async(work_id, author_id) => {
        await httpInstance.post('/get_detail?work_id='+work_id+"&author_id="+author_id).then(res => {
            console.log("get_detail res:", res);
            essayDetail = res.data.result;
            let doi = essayDetail.doi.split('\\');
            essayDetail.doi = doi[3] + doi[4];
        })
    }

    return{
        essayInfo,
        essayDetail,
        getEssayDetail
=======
    return{
        essayInfo,
>>>>>>> Stashed changes
    }
}, {
    persist: true,
  })