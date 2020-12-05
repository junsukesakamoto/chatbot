const defaultDataset = {
    "init": {
        answers: [
            {content: "サービスについて知りたい", nextId: "job_offer"},
            {content: "pixelworksを買収したい", nextId: "website"},
        ],
        question: "こんにちは！PixelWorksへのご用件はなんでしょうか？",
    },
    "job_offer": {
        answers: [
            {content: "阪本さんについて知りたい", nextId: "website"},
            {content: "どういうサービスがあるのか知りたい", nextId: "website"},
            {content: "企業間の友好関係を築きたい", nextId: "website"},
            {content: "福田さんについて知りたい", nextId: "website"}
        ],
        question: "詳しくお聞かせ下さい",
    },
    "website": {
        answers: [
            {content: "Webサイトを見る", nextId: "http://www.pixelworks.co.jp/"},
            {content: "最初の質問に戻る", nextId: "init"}
        ],
        question: "Webサイトはコチラからご覧になれます。",
    }
}

export default defaultDataset