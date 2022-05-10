
const str = `
{"content":{"type":"text","content":"pils1","caption":"#пропоную_ліки\n\npils1\n\nЗа деталями звертатися до @miraculous_bog"},"type":"ліки","msgId":19,"userInfo":{"username":"miraculous_bog","name":"Miraculous","id":357629644},"main":false}

{"content":{"type":"text","content":"pils2","caption":"#пропоную_ліки\n\npils2\n\nЗа деталями звертатися до @miraculous_bog"},"type":"ліки","msgId":28,"userInfo":{"username":"miraculous_bog","name":"Miraculous","id":357629644},"main":false}

{"content":{"type":"text","content":"pils3","caption":"#потребую_ліки\n\npils3\n\nЗа деталями звертатися до @miraculous_bog"},"type":"ліки","msgId":35,"userInfo":{"username":"miraculous_bog","name":"Miraculous","id":357629644},"main":false}

{"content":{"type":"text","content":"pils5","caption":"#пропоную_ліки\n\npils5\n\nЗа деталями звертатися до @miraculous_bog"},"type":"ліки","msgId":54,"userInfo":{"username":"miraculous_bog","name":"Miraculous","id":357629644},"main":false}

{"content":{"type":"text","content":"pils4","caption":"#пропоную_ліки\n\npils4\n\nЗа деталями звертатися до @miraculous_bog"},"type":"ліки","msgId":44,"userInfo":{"username":"miraculous_bog","name":"Miraculous","id":357629644},"main":false}

{"content":{"type":"photo","content":"AgACAgIAAxkBAAM-YnpF7PSqJQAB6BydMFnz-K-lSyfqAAJDuzEbfaXQS5wRFxIiED6OAQADAgADcwADJAQ","caption":"#пропоную_ліки\n\npils6\n\nЗа деталями звертатися до @miraculous_bog"},"type":"ліки","msgId":63,"userInfo":{"username":"miraculous_bog","name":"Miraculous","id":357629644},"main":false}`
// const arr = str.split("drf");
// const arr2 = arr.map(item => JSON.parse(item));
console.log(JSON.parse(str));