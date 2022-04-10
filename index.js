const { getCipherInfo, createCipheriv } = require("crypto");
const TelegramBot = require("node-telegram-bot-api");
const Token = "5226417031:AAFwZUpeQRflnyN3IuqlQxsErEkwnVJEMus";

const bot = new TelegramBot(Token, { polling: true });
let num_adm = 1;
const Users = [
  {
    id: 357629644,
    status: true,
    username: "miraculous_bog",
    state: 0,
    posting: false,
    notification: [["ліки", false], ["житло", true], ["волонтерство", true], ["їжа", true], ["інше", true]],
    temporyMsg: [],
    counterPostsSection: {
      counter: 0,
      type: undefined,
      arrayPost: undefined,
    },
  },
];

const info = {
  tab_blood: [
    "Рекомендуємо перед тим, як піти в пункт зателефонувати в лікарню і уточнити про поточний стан кількиості крові, зробити це можна зателефонувавши лікарні (номер можна знайти на google map)\n\nВінниця \nвул. Пирогова, 48\n\nІллінці\nвул. Енгельса, 48\n\nГайсин\nвул. Гурвича, 1\n\nЯмпіль\nвул. Пирогова, 1\n\n Могилів-Подільський\nвул. Полтавська, 89/2\n\nШаргород\nвул. Пархоменко, 9\n\nБар\nвул. Рози Люксембург, 34\n\nБершадь\nвул. Будкевича, 2",
  ],
  tab_point: [""],
};
const typeDinamicPost = ["ліки", "житло", "волонтерство", "їжа", "інше"];
const dinamickPost = [
  {
    content: {
      type: 'text',
      content: 'pills',
      caption: '#пропоную_ліки\n\npills'
    },
    type: 'ліки',
    msgId: 4651,
    userInfo: { username: undefined, name: 'Miraculous', id: 357629644 },
    main: false
  },
  {
    content: {
      type: 'text',
      content: 'home',
      caption: '#потребую_житло\n\nhome'
    },
    type: 'житло',
    msgId: 4658,
    userInfo: { username: undefined, name: 'Miraculous', id: 357629644 },
    main: false
  }
  //   {
  //     content: { type: 'text', content: '1======', caption: '1======' },
  //     type: 'requestShelter',
  //     msgId: 2011,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '2----------', caption: '2----------' },
  //     type: 'requestShelter',
  //     msgId: 2015,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '3===========', caption: '3===========' },
  //     type: 'requestShelter',
  //     msgId: 2019,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '4========', caption: '4========' },
  //     type: 'requestShelter',
  //     msgId: 2023,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '5======', caption: '5======' },
  //     type: 'requestShelter',
  //     msgId: 2028,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '6====', caption: '6====' },
  //     type: 'requestShelter',
  //     msgId: 2032,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '7=========', caption: '7=========' },
  //     type: 'requestShelter',
  //     msgId: 2036,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: {
  //       type: 'text',
  //       content: '8============',
  //       caption: '8============'
  //     },
  //     type: 'requestShelter',
  //     msgId: 2040,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '9======', caption: '9======' },
  //     type: 'requestShelter',
  //     msgId: 2044,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   },
  //   {
  //     content: { type: 'text', content: '10====', caption: '10====' },
  //     type: 'requestShelter',
  //     msgId: 2048,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   }
  //   ,
  //   {
  //     content: { type: 'text', content: '11====', caption: '11====' },
  //     type: 'requestShelter',
  //     msgId: 2056,
  //     userInfo: { username: 'miraculous_bog', name: 'Miraculous', id: 357629644 },
  //     main: false
  //   }
];

const typeStaticPost = [];
const staticPost = [];

// let temporyMsg = [];
const getChatId = (msg) => {
  return msg.chat.id;
};

const getPostBoard = (chatId) => {
  bot.sendMessage(chatId, `📃Зробити та переглянути публікації про допомогу або запроповнувати її.

  Ви можете запропонувати/знайти допомогу по таким пунктам як :
  
  💁‍♂️Натисніть "Пропоную" - якщо ви бажаєте запропонувати свою допомогу.
  🙋‍♂️Натисніть "Потребую" - якщо ви бажаєте опублікувати пост про надання вам допомоги.
  📋Натисніть "Список пропонуючих та потребуючих допомоги" - якщо ви бажаєте продивитися список усіх постів та знайти шось для себе.`, {
    reply_markup: {
      inline_keyboard: [
        // [
        //   {
        //     text: "show users",
        //     callback_data: "show_users",
        //   },
        // ],
        [
          {
            text: "💁‍♂️Пропоную",
            callback_data: "offer",
          },
          {
            text: "🙋‍♂️Потребую",
            callback_data: "need",
          },
        ],
        [
          {
            text: "📋Переглянути список постів допомоги",
            callback_data: "look_list",
          },
        ],
      ],
    },
  });
};
const showKeyboard = (chatId) => {
  // console.log('keyyyyyboard');
  const allArraysOfBtns = typeStaticPost.map((item) => {
    return [
      {
        text: item,
        callback_data: item,
      },
    ];
  });

  // console.log("allArraysOfBtns", allArraysOfBtns);
  bot.sendMessage(chatId, "Тут ви можете знайти найактуальнішу інформацію, яка допоможе вам під час війни. Інформація постійно оновлюється. Це статична інформація, яка може містити посилання на інші джерела.", {
    reply_markup: {
      inline_keyboard: [

        ...allArraysOfBtns,
      ],
    },
  });
};

const getIntro = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Ознайомитися",
            callback_data: "intro",
          },
        ],
      ],
    },
  };
};
const getMenuBtn = () => {
  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Розділи",
            callback_data: "menu",
          },
        ],
      ],
    },
  };
};
const getBasicMenu = (id, additionInfo = '') => {
  bot.sendMessage(id, `${additionInfo}\nВаші розділи:`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "📃Пости/публікації допомоги",
            callback_data: "posts",
          },
          {
            text: "ℹ️Інформація на всі випадки",
            callback_data: "allInfo",
          },
        ],
        [
          {
            text: "🔔Керування оповіщеннями",
            callback_data: "controlNotification",
          },
          {
            text: "📤Мої пости",
            callback_data: "myPosts",
          },
        ],
      ],
    },
  });
}
function sendingWrittenPost(msg) {
  const user = getUser(msg);
  // console.log("tmps", temporyMsg[1]);
  console.log("223 sendingWrittenPostFC", user.temporyMsg);
  if (user.temporyMsg[1].type === "text") {

    bot.sendMessage(getChatId(msg), msg.text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "❌Відміна",
              callback_data: "deny",
            },
            {
              text: "🪄Редагувати",
              callback_data: "edit",
            },
            {
              text: "✅готово",
              callback_data: "ready",
            },
          ],
        ],
      },
    });
  } else if (user.temporyMsg[1].type === "video") {
    bot.sendVideo(getChatId(msg), msg.video.file_id, msg.caption, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "❌Відміна",
              callback_data: "deny",
            },
            {
              text: "🪄Редагувати",
              callback_data: "edit",
            },
            {
              text: "✅готово",
              callback_data: "ready",
            },
          ],
        ],
      },
    });
  } else if (user.temporyMsg[1].type === "photo") {
    bot.sendPhoto(getChatId(msg), msg.photo[0].file_id);
    bot.sendMessage(getChatId(msg), msg.caption, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "❌Відміна",
              callback_data: "deny",
            },
            {
              text: "🪄Редагувати",
              callback_data: "edit",
            },
            {
              text: "✅готово",
              callback_data: "ready",
            },
          ],
        ],
      },
    });
  }
}

const sendMsg = function (msg, text) {
  bot.sendMessage(getChatId(msg), text);
};

const getUser = (msg) => Users.find((user) => user.id === msg.chat.id);

const getUserById = (id) => Users.find((user) => user.id === id);

const getStaticPostById = (id) => staticPost.find((post) => post.msgId === id);

const getStaticType = (title) => typeStaticPost.find((name) => name === title);

const getDinamicPostById = (id) => dinamickPost.find((post) => post.msgId === id);

const isAdmin = (msg) =>
  Users.find((admin) => admin.id === msg.chat.id && admin.status === true);

const deletePost = (id, postId) => {

  // console.log("postId!", user.id, postId);
  // console.log(getStaticPostById(currentText));
  const positionCurrentEl = dinamickPost.indexOf(getDinamicPostById(postId));


  // console.log(staticPost, positionCurrentEl);
  dinamickPost.splice(positionCurrentEl, 1);
  // console.log(staticPost);
  // Users.forEach((user) => {
  //   bot.sendMessage();
  // });
  bot.sendMessage(id, `Пост №${postId} був видалений`);
};

const sendAllTypesMsg = (post, id, btn = null, info = null) => {
  // console.log("BTN HERE", btn);
  // console.log("INFO", info);

  let text = post.caption;

  // console.log(isAdmin({ chat: { id: id } }));
  // console.log(post, id, info);
  if (isAdmin({ chat: { id: id } }) && info !== null) {
    // console.log("yaaaaaaaaaaaaaaaaaaaa");
    text += `\n--------------------------\n`
    text += `ім'я користувача ${info.name}\n`;
    text += `username користувача @${info.username}\n`;
    text += `id користувача ${info.id}\n`;
    text += `id повідомлення ${info.msgId}`;
    // console.log(info);
  }

  // console.log("TEXT", text);
  let parseBtn = null;
  if (btn !== null) {
    // console.log("BTN HERE");
    parseBtn = {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: `Видалити`,
              callback_data: `delete${btn}`,
            },
          ],
        ],
      },
    };
  }

  if (post.type === "text") {
    btn !== null
      ? bot.sendMessage(id, text, parseBtn)
      : bot.sendMessage(id, text);
  } else if (post.type === "video") {
    if (btn !== null) {
      bot.sendVideo(id, post.content);
      bot.sendMessage(id, text, parseBtn);
    } else {
      bot.sendVideo(id, post.content);
      bot.sendMessage(id, text);
    }
  } else if (post.type === "photo") {
    if (btn !== null) {
      bot.sendPhoto(id, post.content);
      bot.sendMessage(id, text, parseBtn);
    } else {
      bot.sendPhoto(id, post.content);
      bot.sendMessage(id, text);
    }
  }
};
const isTurnUserNotif = (arrOfControler, type) => {
  const controler = arrOfControler.find(el => el[0] === type);
  console.log(controler);
  if (controler[1]) {
    return true;
  } else {
    return false;
  }
}
const sendPost = (type, content, id) => {
  console.log("sendPostsendPostsendPostsendPostєєєєєєєєє");
  Users.forEach((user) => {
    // isTurnUserNotif(user.notification, type) ? 'yee' : 'noo';
    // user.id !== id ? 'yeee' : 'noo';
    if (isTurnUserNotif(user.notification, type) && user.id !== id) {
      console.log('cooooooo', content, user.id);
      sendAllTypesMsg(content, user.id);
    }
  });
};

const getTypeFile = (msg) => {
  if (msg.text) {
    return { type: "text", content: msg.text, caption: msg.text };
  } else if (msg.video) {
    return { type: "video", content: msg.video.file_id, caption: msg.caption };
  } else if (msg.photo) {
    return {
      type: "photo",
      content: msg.photo[0].file_id,
      caption: msg.caption,
    };
  }
};


const sendSepSectionPost = (id, user) => {
  // console.log('3outputPosts=================');
  bot.sendMessage(id, "Далі...", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `${user.counterPostsSection.counter} / ${user.counterPostsSection.arrayPost.length}>>>`,
            callback_data: "next",
          },
        ],
        [
          {
            text: "Розділи",
            callback_data: "menu",
          },
        ],
      ],
    },
  })
};

const outputPosts = (id, user) => {
  // console.log(counterPostsSection);
  console.log('outputPosts=================');
  const mainPost = dinamickPost.filter(post => post.main === true && post.type === user.counterPostsSection.type);
  const noMainPost = dinamickPost.filter(post => post.main === false && post.type === user.counterPostsSection.type);
  // console.log(mainPost, noMainPost);
  user.counterPostsSection.arrayPost = [...noMainPost];
  // console.log(counterPostsSection.arrayPost, "........", noMainPost);
  mainPost.forEach(post => setTimeout(sendAllTypesMsg, 1000, post.content, id));
  console.log('2outputPosts=================');
  setTimeout(sendSepSectionPost, 2000, id, user);
};

bot.on("message", (msg) => {
  const user = getUser(msg);
  if (msg.text !== undefined) {
    // console.log(msg);
    if (msg.text[0] === "/") return;
  }
  if (user.status === null) return;
  console.log("461 onMSG", user.temporyMsg);
  user.temporyMsg[1] = getTypeFile(msg);

  if (getUser(msg).state !== 0) sendingWrittenPost(msg);
});
const doCommandAction = (command, posting, msg) => {
  const text = `📃Напишіть пост стосовно розділу ${command}.
  Напишіть текстове повідомлення вашого запиту або пропозиції.
  ❕Ви також можете використати тільки одну картинку або відео, та додати опис для неї. Вся інформація повинна бути відправлена одним повідомленням.
  ❗️Обов'язково додайте інформацію, яка дасть змогу зв'язатися з вами.
   ✅Автоматично бот додає ваш нікнейм з телеграму, якщо він у вас наявний, а також хештег.`;
  sendMsg(msg, text);
  const user = getUser(msg);
  console.log("469 doCommandActionFC", user.temporyMsg);
  user.state = 1;
  user.posting = posting;
  user.temporyMsg[0] = command;
};

const transformDeleteData = (data) => {
  let strData = data.split("");
  let removed = strData.splice(0, 6);
  return [removed.join(""), strData.join("")];
};

const getTypeAndContent = (content) => {
  const splitedContent = content.split("`");
  return [splitedContent[0], splitedContent[1]];
};

const getLengthOfDinamicType = (type) => {
  const howManyCurrentType = dinamickPost.filter(el => el.type === type);
  return howManyCurrentType.length;
}

const getTypeDinamic = (type) => {
  const arrOfBtnType = [];
  let counterFiled = 0;
  let cunterArrFiled = [];
  for (let i = 0; i < typeDinamicPost.length; i++) {

    if ((counterFiled % 3) === 0) {
      arrOfBtnType.push(cunterArrFiled);
      cunterArrFiled = [];
    }

    cunterArrFiled.push({ text: `${typeDinamicPost[i]} ${getLengthOfDinamicType(typeDinamicPost[i])}шт.`, callback_data: `${type}_${typeDinamicPost[i]}` });
    // console.log("cunterArrFiled", cunterArrFiled);
    counterFiled++;
    if (i === typeDinamicPost.length - 1) {
      arrOfBtnType.push(cunterArrFiled);
      console.log('arrOfBtnType', arrOfBtnType);
      return arrOfBtnType;
    }
  }

  return arrOfBtnType;
}
// 🔔🔕
// 🟢🔴
const getTagNot = (state) => state ? '🔔' : '🔕';
const getTypeDinamicForNotification = (type, id) => {
  const userNot = getUserById(id).notification;
  const arrOfBtnType = [];
  let counterFiled = 0;
  let cunterArrFiled = [];
  for (let i = 0; i < userNot.length; i++) {

    if ((counterFiled % 3) === 0) {
      arrOfBtnType.push(cunterArrFiled);
      cunterArrFiled = [];
    }

    cunterArrFiled.push({ text: `${userNot[i][0]} ${getTagNot(userNot[i][1])}`, callback_data: `${type}_${userNot[i][0]}` });
    // console.log("cunterArrFiled", cunterArrFiled);
    counterFiled++;
    if (i === userNot.length - 1) {
      arrOfBtnType.push(cunterArrFiled);
      return arrOfBtnType;
    }
  }
  return arrOfBtnType;
}
const getMsg = (query) => {
  const id = getChatId(query.message);
  const user = getUser(query.message);
  const deletedBtn = transformDeleteData(query.data);

  if (deletedBtn[0] === "delete") {
    deletePost(id, Number(deletedBtn[1]));
    // deletePost(Number(deletedBtn[1]) + 2);
    return;
  }
  if (typeStaticPost.includes(query.data)) {
    staticPost.forEach((post) => {
      if (post.type === query.data) {
        const infoUserObj = { ...post.userInfo };
        infoUserObj.msgId = post.msgId;
        sendAllTypesMsg(post.content, id, null, infoUserObj);
      }
    });
  }
  if (query.data.includes("needing")) {
    // console.log("yeeeeeeeeeeeeeeeeeessss")
    const dataOfDinamicType = query.data.split("_")[1];
    doCommandAction(dataOfDinamicType, `#потребую_${dataOfDinamicType}\n\n`, query.message);
  } else if (query.data.includes("offering")) {
    // console.log("yeeeeeeeeeeeeeeeeeessss")
    const dataOfDinamicType = query.data.split("_")[1];
    doCommandAction(dataOfDinamicType, `#пропоную_${dataOfDinamicType}\n\n`, query.message);
  } else if (query.data.includes("showing")) {
    console.log("showingggggggggggggggg", user);
    user.counterPostsSection.counter = 0;
    console.log("showingggggggggggggggg", user);
    user.counterPostsSection.type = query.data.split("_")[1];
    user.counterPostsSection.arrayPost = undefined;
    outputPosts(getChatId(query.message), user);
  } else if (query.data.includes("turnNotif")) {
    // console.log('turnNotif turnNotif turnNotif turnNotif');
    const typeForChangeStateNotif = query.data.split("_")[1];
    const currentChangeTypeNotif = user.notification.find(notif => notif[0] === typeForChangeStateNotif);
    const indexElement = user.notification.indexOf(currentChangeTypeNotif);
    if (user.notification[indexElement][1]) {
      user.notification[indexElement][1] = false;
      bot.sendMessage(id, `Тепер вам не будуть надсилатися пости категорії ${user.notification[indexElement][0]} 🔔 -> 🔕`);
    } else {
      user.notification[indexElement][1] = true;
      bot.sendMessage(id, `Тепер вам будуть надсилатися пости категорії ${user.notification[indexElement][0]} 🔕 -> 🔔`);
    }
  }

  switch (query.data) {
    case "show_users":
      console.log(
        "-----",
        typeDinamicPost,
        typeStaticPost,
        "-----",
        staticPost,
        "-----",
        dinamickPost,
        "-----",
        Users
      );
      break;
    case "next":








      // console.log("neeext seccuess====");
      let Action = false;
      const getSituableAction = (isDo) => {

        if (isDo) {
          // console.log('isDoiiing');
          // bot.sendMessage(getChatId(query.message), "Ваші розділи туть 👇", getMenuBtn());
        } else {
          sendSepSectionPost(getChatId(query.message), user);
        }
      }
      let iter = 3;
      if (user.counterPostsSection.counter + iter >= user.counterPostsSection.arrayPost.length) {
        iter = user.counterPostsSection.arrayPost.length - user.counterPostsSection.counter;
        Action = true;
        // console.log("YEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
      }
      // console.log("neeext seccuess====");
      let iteration = user.counterPostsSection.counter + iter;
      // console.log(iteration);
      // console.log("iteer anhd counterPostsSection", counterPostsSection.counter, iter);
      const newId = getChatId(query.message);
      for (let i = user.counterPostsSection.counter; i < iteration; i++) {
        // console.log(i);
        const infoUserObj = { ...user.counterPostsSection.arrayPost[i].userInfo };
        infoUserObj.msgId = user.counterPostsSection.arrayPost[i].msgId;
        setTimeout(sendAllTypesMsg, 1000, user.counterPostsSection.arrayPost[i].content, newId, null, infoUserObj);
      }
      // console.log("iteer anhd counterPostsSection", counterPostsSection.counter, iter);
      user.counterPostsSection.counter += iter;
      // console.log("iteer anhd counterPostsSection", counterPostsSection.counter, iter);

      setTimeout(getSituableAction, 5000, Action);







      break;
    case "need":
      // console.log("getTypeDinamic", getTypeDinamic());
      bot.sendMessage(id, "Виберіть бажану категорію:", {
        reply_markup: {
          inline_keyboard: getTypeDinamic("needing")
        }
      });
      break;
    case "offer":
      // console.log("getTypeDinamic", getTypeDinamic());
      bot.sendMessage(id, "Виберіть бажану категорію:", {
        reply_markup: {
          inline_keyboard: getTypeDinamic("offering")
        }
      });
      break;
    case "look_list":
      console.log("getTypeDinamic");
      bot.sendMessage(id, "Виберіть бажану категорію:", {
        reply_markup: {
          inline_keyboard: getTypeDinamic("showing")
        }
      });
      break;
    case "controlNotification":
      bot.sendMessage(id, "Виберіть бажану категорію:", {
        reply_markup: {
          inline_keyboard: getTypeDinamicForNotification("turnNotif", id)
        }
      });
      break;
    case "menu":
      // bot.sendMessage(id, `Ваші розділи туть 👇`, getBasicMenu(id));
      getBasicMenu(id);
      break;
    case "intro":
      getPostBoard(id);
      showKeyboard(id);
      // bot.sendMessage(id, "Розділи", showKeyboard(getChatId(msg)));
      break;
    case "posts":
      getPostBoard(id);
      break;
    case "allInfo":
      showKeyboard(id);
      break;
    case "myPosts":
      console.log("MyPooostss");
      let i = 1
      dinamickPost.forEach(myPost => {
        console.log(myPost);
        if (myPost.userInfo.id === id) {
          console.log("true")
          let innerContent = {
            type: myPost.content.type,
            content: myPost.content.content,
            caption: myPost.content.caption,
          }
          // console.log("========", caption, myPost.caption);
          innerContent.caption += `\nКатегорія: ${myPost.type}`
          innerContent.caption += `\nId повідомлення: ${myPost.msgId}`
          innerContent.caption += `\nВаша публікація №${i}`
          console.log(innerContent, id, myPost.msgId);
          console.log(myPost, id, myPost.msgId);
          setTimeout(sendAllTypesMsg, 1000, innerContent, id, myPost.msgId)
          // sendAllTypesMsg(myPost.content, id, myPost.msgId);
          i++;
        }
      });
      i = 0;
      bot.sendMessage(id, "Ваші розділи туть 👇", getMenuBtn());
      break;
    case "edit":
      bot.sendMessage(id, "Введіть нову або відредаговану інформацію");
      break;
    case "deny":
      bot.sendMessage(id, "ви відмінили публікацію");
      //   console.log(query);
      user.state = 0;
      user.posting = false;
      break;
    case "ready":
      // bot.sendMessage(id, temporyMsg);
      console.log("----------------");
      console.log("user 732", user);
      if (user.state == 2) {
        user.state = 0;
        // console.log("2");

        // user.posting[`${temporyMsg[0]}`] = false;
        // console.log("3");
        const getMetaData = getTypeAndContent(user.temporyMsg[1].caption);

        user.temporyMsg[0] = getMetaData[0];
        user.temporyMsg[1].caption = getMetaData[1];
        if (!typeStaticPost.includes(user.temporyMsg[0])) {
          typeStaticPost.push(user.temporyMsg[0]);
        }
        // console.log("query.message_______________++++++++", query.message);
        console.log("714 ", user.temporyMsg);
        staticPost.push({
          content: user.temporyMsg[1],
          type: user.temporyMsg[0],
          msgId: query.message.message_id,
          userInfo: {
            username: query.message.chat.username,
            name: query.message.chat.first_name,
            id: query.message.chat.id,
          },
        });
        // sendPost(user.temporyMsg[0], user.temporyMsg[1], id);
        Users.forEach(user => {
          bot.sendMessage(user.id, `Додана нова інформація на тему "${user.temporyMsg[0]}". Для того аби переглянути натисніть "Розділи" -> "Інформація на всі випадки"`);
        })
        // console.log("great");
        // sendAllTypesMsg(user.temporyMsg[1], id, query.message.message_id);
      } else if (user.state == 1) {
        user.state = 0;
        console.log("----------------", user);
        // console.log("2");
        console.log("user 732", user);
        console.log("732 ", user.temporyMsg);
        let textInfo = user.posting;
        textInfo += user.temporyMsg[1].caption;
        if (query.message.chat.username !== undefined) {
          textInfo += `\n\nЗа деталями звертатися до @${query.message.chat.username}`
        }
        user.temporyMsg[1].caption = textInfo;

        dinamickPost.push({
          content: user.temporyMsg[1],
          type: user.temporyMsg[0],
          msgId: query.message.message_id,
          userInfo: {
            username: query.message.chat.username,
            name: query.message.chat.first_name,
            id: query.message.chat.id,
          },
          main: false,
        });
        user.posting = false;
        const textSuccess = `Ваш пост успішно доданий та опублікований. ✅
        Ви можете його видалити.
        Ви можете переглянути всі ваші пости скориставшись: "Розділи" -> "Мої пости".`;
        bot.sendMessage(getChatId(query.message), textSuccess);
        // console.log("Ваший пост успішно доданий");
        // console.log()
        sendAllTypesMsg(user.temporyMsg[1], id, query.message.message_id, null);
        sendPost(user.temporyMsg[0], user.temporyMsg[1], id);
        bot.sendMessage(id, "Ваші розділи туть 👇", getMenuBtn());
      }
  }
};

bot.onText(/\/start/, (msg) => {
  console.log('staaaaaaaart');
  const userId = msg.from.id;
  const text1 = `🔰Для початку роботи натисніть "Ознайомитися".
`;
  const text2 = `Для того, аби переглянути публікації інших щодо допомоги або її надання: 

🔎🏡Натисніть "Існуючі пропозиції житла"
🔎❤️‍🩹Натисніть "Існуючі пропозиції волонтерсва"`;
  // console.log(userId);
  // console.log(isExist);
  // console.log(Users);
  // console.log('staaaaaaaart');
  const isExist = Users.find((item) => item.id === userId);

  !isExist
    ? Users.push({
      id: msg.from.id,
      username: msg.from.username,
      status: false,
      state: 0,
      posting: false,
      notification: [["ліки", true], ["житло", true], ["волонтерство", true], ["їжа", true], ["інше", true]],
      temporyMsg: [],
      counterPostsSection: {
        counter: 0,
        type: undefined,
        arrayPost: undefined,
      },
    })
    : null;

  bot.sendMessage(getChatId(msg), text1);
  // bot.sendMessage(getChatId(msg), text2);
  // bot.sendMessage(getChatId(msg), text2);
  // bot.sendMessage(getChatId(msg), text2);
  bot.sendMessage(getChatId(msg), "👇", getIntro());

  // getMenuBtn();
});

bot.on("callback_query", (query) => {
  getMsg(query);
});



bot.onText(/\/addPost/, (msg) => {
  if (isAdmin(msg)) {
    getUser(msg).state = 2;
    bot.sendMessage(
      getChatId(msg),
      "Вітаю шановний адмін, напишіть ваше повідомлення у форматі: назва розділу`наповнення"
    );
  }
});

bot.onText(/\/turnAdmin (.+)/, (msg, source, match) => {
  const currentText = Number(source[1]);
  // console.log(currentText);
  if (isAdmin(msg)) {
    // console.log("before user");
    const user = getUserById(currentText);
    // console.log(user);
    if (user.status === false) {
      user.status = true;
      bot.sendMessage(currentText, `Вітаю! Ти адмін.
      Твої команди:
      Увага! Всі команди, які мають позначку ❗️, додаються лише з попереднім погодженням
      Динамічні пости:
      ❗️ /addTypeDinamic "назва категорія" - додати категорію в динамічні пости/публікації. Увага! після додавання категорії її не можливо буде видалити.
      /makeTopDinamicPost "message id повідомлення" - підняти/прибрати динамічне повідомлення уверх, воно буде виводитися одразу після запросу публікацій певної категорії
      /deleteDinamicType "message id повідомлення" - видалити динамічну публікацію
      
      Статичні пости:
      /deleteStaticPost "message id повідомлення" - видалити пост
      ❗️/deleteStaticType "назва категорії" - *для того аби подивитися існуючі назви введіть /showType. Видаляє категорію статичних повідомлень. Увага! Категорія може бути видалена лише після повного очищення цієї категорії від повідомлення.
      
      ❗️/banUser "id user" - додати користувача в чорний список, та заблокувати користування ботом.`);
    }
    else {
      user.status = false;
      bot.sendMessage(currentText, 'Тепер ви не адмін((');
    }
  }
});
bot.onText(/\/banUser (.+)/, (msg, source, match) => {
  const currentText = Number(source[1]);
  // console.log(currentText);
  if (isAdmin(msg)) {
    // console.log("before user");
    const user = getUserById(currentText);
    // console.log(user);
    user.status = null;
    bot.sendMessage(currentText, `
      Через порушення правил, із вашої сторони, ми були вимушені додати вас в чорний список()`);

  }
});

bot.onText(/\/deleteStaticPost (.+)/, (msg, source, match) => {
  const currentText = Number(source[1]);
  // console.log(currentText);
  if (isAdmin(msg)) {
    // console.log(getStaticPostById(currentText));
    const positionCurrentEl = staticPost.indexOf(getStaticPostById(currentText));


    // console.log(staticPost, positionCurrentEl);
    staticPost.splice(positionCurrentEl, 1);
    // console.log(staticPost);
  }
});
bot.onText(/\/deleteStaticType (.+)/, (msg, source, match) => {
  const currentText = source[1];
  // console.log(currentText);
  if (isAdmin(msg)) {
    const positionCurrentEl = typeStaticPost.indexOf(getStaticType(currentText));


    // console.log(staticPost, positionCurrentEl);
    typeStaticPost.splice(positionCurrentEl, 1);
    // console.log(staticPost);
  }
});

bot.onText(/\/showType/, (msg) => {
  if (isAdmin(msg)) {
    typeStaticPost.forEach(title => bot.sendMessage(getChatId(msg), title));
  }
});

bot.onText(/\/baned/, (msg) => {
  const banedUsers = Users.filter(user => user.status === null);
  bot.sendMessage(getChatId(msg), 'Список користувачів, які можливо є шахраями:');
  banedUsers.forEach(userInfo => {
    let text = "";
    text += `\n--------------------------\n`;
    text += `\nСписок кори\n`;
    text += `ім'я користувача ${userInfo.name}\n`;
    text += `username користувача @${userInfo.username}\n`;
    text += `id користувача ${userInfo.id}\n`;
    bot.sendMessage(getChatId(msg), text);
  });
});

bot.onText(/\/deleteDinamicType (.+)/, (msg, source, match) => {
  const currentText = Number(source[1]);
  // console.log(currentText);
  if (isAdmin(msg)) {
    const positionCurrentEl = dinamickPost.indexOf(getDinamicPostById(currentText));


    // console.log(staticPost, positionCurrentEl);
    bot.sendMessage(getChatId(msg), `Пост ${currentText} видаления із категорії ${dinamickPost[positionCurrentEl].type}`)
    dinamickPost.splice(positionCurrentEl, 1);
    // console.log(staticPost);
  }
});

bot.onText(/\/makeTopDinamicPost (.+)/, (msg, source, match) => {
  const currentText = Number(source[1]);
  // console.log(currentText);
  if (isAdmin(msg)) {
    const positionCurrentEl = dinamickPost.indexOf(getDinamicPostById(currentText));


    // console.log(staticPost, positionCurrentEl);
    if (dinamickPost[positionCurrentEl].main === true) {
      dinamickPost[positionCurrentEl].main = false;
      bot.sendMessage(getChatId(msg), `Пост ${source[1]} прибраний з топу`)

    } else {
      dinamickPost[positionCurrentEl].main = true;
      bot.sendMessage(getChatId(msg), `Пост ${source[1]} доадний в топ`)

    }
  }
});

bot.onText(/\/addTypeDinamic (.+)/, (msg, source, match) => {
  const currentText = source[1];
  // console.log(currentText);
  if (isAdmin(msg)) {
    typeDinamicPost.push(currentText);
    Users.forEach(user => user.notification.push([currentText, true]));
    bot.sendMessage(getChatId(msg), `Категорія ${currentText} додана`)
  }
});


// const getInfoCurrentNot = (meaning) => {
//   if (meaning) {
//     return 'увімкнено✅';
//   } else {
//     return 'ввимкнено❌';
//   }
// }

// bot.onText(/\/turnRequestShelter/, (msg) => {

//   const positionCurrentEl = Users.indexOf(getUser(msg));
//   if (Users[positionCurrentEl].subscribed.requestShelter === true) {
//     Users[positionCurrentEl].subscribed.requestShelter = false;
//     bot.sendMessage(getChatId(msg), "Ви ввимкнули");

//   } else {
//     Users[positionCurrentEl].subscribed.requestShelter = true;
//     bot.sendMessage(getChatId(msg), "Ви увімкнули");

//   }
//   bot.sendMessage(getChatId(msg), "Ваші розділи туть 👇", getMenuBtn());

// });

// bot.onText(/\/turnOfferShelter/, (msg) => {

//   const positionCurrentEl = Users.indexOf(getUser(msg));
//   if (Users[positionCurrentEl].subscribed.offerShelter === true) {
//     Users[positionCurrentEl].subscribed.offerShelter = false;
//     bot.sendMessage(getChatId(msg), "Ви відключили");

//   } else {
//     Users[positionCurrentEl].subscribed.offerShelter = true;
//     bot.sendMessage(getChatId(msg), "Ви включили");

//   }
//   bot.sendMessage(getChatId(msg), "Ваші розділи туть 👇", getMenuBtn());

// });

// bot.onText(/\/turnRequestVolunteering/, (msg) => {

//   const positionCurrentEl = Users.indexOf(getUser(msg));
//   if (Users[positionCurrentEl].subscribed.requestVolunteering === true) {
//     Users[positionCurrentEl].subscribed.requestVolunteering = false;
//     bot.sendMessage(getChatId(msg), "Ви відключили");

//   } else {
//     Users[positionCurrentEl].subscribed.requestVolunteering = true;
//     bot.sendMessage(getChatId(msg), "Ви включили");

//   }
//   bot.sendMessage(getChatId(msg), "Ваші розділи туть 👇", getMenuBtn());

// });
// bot.onText(/\/turnOfferVolunteering/, (msg) => {

//   const positionCurrentEl = Users.indexOf(getUser(msg));
//   if (Users[positionCurrentEl].subscribed.offerVolunteering === true) {
//     Users[positionCurrentEl].subscribed.offerVolunteering = false;
//     bot.sendMessage(getChatId(msg), "Ви відключили");

//   } else {
//     Users[positionCurrentEl].subscribed.offerVolunteering = true;
//     bot.sendMessage(getChatId(msg), "Ви включили");

//   }
//   bot.sendMessage(getChatId(msg), "Ваші розділи туть 👇", getMenuBtn());

// });

const getAllAdimns = () => Users.filter(user => user.status === true);

bot.onText(/\/admin/, (msg) => {

  getAllAdimns().forEach(admin => bot.sendMessage(admin.id, `@${msg.from.username} викликває адміна.\n Звернення #${num_adm}`));
  bot.sendMessage(getChatId(msg), `Звернення #${num_adm} в обробці. Очікуйте зворотнього зв'язку`);
  num_adm++;
});

// bot.onText(/\/infoNotification/, (msg) => {
//   bot.sendMessage(getChatId(msg), `Сповіщення

// Ви можете вимкнути або увімкнути надходження постів певної категорії скориставшись наступними командами:
// /turnRequestShelter - надходження щодо запропонованого житла. Ваш поточний статус: ${getInfoCurrentNot(getUser(msg).subscribed.requestShelter)}
// /turnOfferShelter - надходження щодо потребуючих житло. Ваш поточний статус: ${getInfoCurrentNot((getUser(msg).subscribed.offerShelter))}
// /turnRequestVolunteering - надходження щодо запропонованої допомоги. Ваш поточний статус: ${getInfoCurrentNot((getUser(msg).subscribed.requestVolunteering))}
// /turnOfferVolunteering - надходження щодо потребуючих допомоги. Ваш поточний статус: ${getInfoCurrentNot((getUser(msg).subscribed.offerVolunteering))}`);
// });

bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(getChatId(msg), `Ваші розділи туть 👇`, getBasicMenu(getChatId(msg)));
});
// bot.onText(/\/onAlarm/, (msg) => {
//   if (isAdmin(msg)) {
//     Users.forEach((user) => {
//       bot.sendMessage(user.id, "Увага, тривога, знайти укриття!");
//     });
//   }
// });

// bot.onText(/\/offAlarm/, (msg) => {
//   if (isAdmin(msg)) {
//     Users.forEach((user) => {
//       bot.sendMessage(user.id, "Відміна тривоги");
//     });
//   }
// });

bot.onText(/\/showUsers/, (msg) => {
  if (isAdmin(msg)) {
    Users.forEach(user => bot.sendMessage(getChatId(msg), JSON.stringify(user)));
  }
});

bot.onText(/\/showDinPosts/, (msg) => {
  if (isAdmin(msg)) {
    dinamickPost.forEach(post => bot.sendMessage(getChatId(msg), JSON.stringify(post)));
  }
});

bot.onText(/\/showStatPost/, (msg) => {
  if (isAdmin(msg)) {
    staticPost.forEach(post => bot.sendMessage(getChatId(msg), JSON.stringify(post)));
  }
});
