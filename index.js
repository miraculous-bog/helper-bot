const { getCipherInfo } = require("crypto");
const TelegramBot = require("node-telegram-bot-api");
const Token = "5226417031:AAFwZUpeQRflnyN3IuqlQxsErEkwnVJEMus";

const bot = new TelegramBot(Token, { polling: true });

const Users = [
  {
    id: 357629644,
    status: true,
    username: "miraculous_bog",
    state: 0,
    subscribed: {
      requestShelter: true,
      offerShelter: true,
      requestVolunteering: true,
      offerVolunteering: true,
    },
    posting: {
      requestShelter: false,
      offerShelter: false,
      requestVolunteering: false,
      offerVolunteering: false,
    },
  },
];

const info = {
  tab_blood: [
    "Рекомендуємо перед тим, як піти в пункт зателефонувати в лікарню і уточнити про поточний стан кількиості крові, зробити це можна зателефонувавши лікарні (номер можна знайти на google map)\n\nВінниця \nвул. Пирогова, 48\n\nІллінці\nвул. Енгельса, 48\n\nГайсин\nвул. Гурвича, 1\n\nЯмпіль\nвул. Пирогова, 1\n\n Могилів-Подільський\nвул. Полтавська, 89/2\n\nШаргород\nвул. Пархоменко, 9\n\nБар\nвул. Рози Люксембург, 34\n\nБершадь\nвул. Будкевича, 2",
  ],
  tab_point: [""],
};
const dinamickPost = [];

const typeStaticPost = [];
const staticPost = [];

let temporyMsg = [];
const getChatId = (msg) => {
  return msg.chat.id;
};
const showKeyboard = (chatId) => {
  const allArraysOfBtns = typeStaticPost.map((item) => {
    return [
      {
        text: item,
        callback_data: item,
      },
    ];
  });
  console.log("allArraysOfBtns", allArraysOfBtns);
  // allArraysOfBtns.length===0 ?
  bot.sendMessage(chatId, "smth", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "show users",
            callback_data: "show_users",
          },
        ],
        [
          {
            text: "Бачу диверсанта/окупанта",
            callback_data: "define_enemy",
          },
        ],

        [
          {
            text: "Потребую житло",
            callback_data: "requestShelter",
          },
          {
            text: "Пропоную житло",
            callback_data: "offerShelter",
          },
        ],
        [
          {
            text: "Існуючі пропозиції житла",
            callback_data: "showShelter",
          },
        ],
                [
          {
            text: "Існуючі пропозиції волонтерства",
            callback_data: "showVolunteering",
          },
        ],
        [
          {
            text: "Потребую допомогу",
            callback_data: "requestVolunteering",
          },
          {
            text: "Пропоную допомогу",
            callback_data: "offerVolunteering",
          },
        ],

        ...allArraysOfBtns,
      ],
    },
  });
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
function sendingWrittenPost(msg) {
  console.log("tmps", temporyMsg[1]);
  if (temporyMsg[1].type === "text") {
    // console.log('');

    bot.sendMessage(getChatId(msg), msg.text, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Відміна",
              callback_data: "deny",
            },
            {
              text: "Редагувати",
              callback_data: "edit",
            },
            {
              text: "готово",
              callback_data: "ready",
            },
          ],
        ],
      },
    });
  } else if (temporyMsg[1].type === "video") {
    bot.sendVideo(getChatId(msg), msg.video.file_id, msg.caption, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Відміна",
              callback_data: "deny",
            },
            {
              text: "Редагувати",
              callback_data: "edit",
            },
            {
              text: "готово",
              callback_data: "ready",
            },
          ],
        ],
      },
    });
  } else if (temporyMsg[1].type === "photo") {
    bot.sendPhoto(getChatId(msg), msg.photo[0].file_id);
    bot.sendMessage(getChatId(msg), msg.caption, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Відміна",
              callback_data: "deny",
            },
            {
              text: "Редагувати",
              callback_data: "edit",
            },
            {
              text: "готово",
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

const isAdmin = (msg) =>
  Users.find((admin) => admin.id === msg.chat.id && admin.status === true);

const deletePost = (postId) => {
  // console.log("postId!", postId);

  Users.forEach((user) => {
    console.log("postId!", user.id, postId);

    bot.deleteMessage(user.id, postId);
  });
};
const getHachtag = (tag) => {
  switch (tag) {
    case "requestShelter":
      return "#потребую_житло";
    case "offerShelter":
      return "#пропоную_житло";
    case "requestVolunteering":
      return "#волонтерство_потребую";
    case "offerVolunteering":
      return "#волонтерство_пропоную";
  }
};
const sendAllTypesMsg = (post, id, btn = null, info = null) => {
  console.log("INFO", info);
 
  let text = post.caption;

  console.log(isAdmin({ chat: { id: id } }));
  console.log(post, id, info);

  if (isAdmin({ chat: { id: id } }) && info !== null) {
    console.log("yaaaaaaaaaaaaaaaaaaaa");
    text += `\n--------------------------\n`
    text += `ім'я користувача ${info.name}\n`;
    text += `username користувача @${info.username}\n`;
    text += `id користувача ${info.id}\n`;
    text += `id повідомлення ${info.msgId}`;
    console.log(info);
    post.caption = text;
  }
  // console.log(`id користувача ${info.id}\n`);
  // console.log(`username користувача ${info.username}\n`);
  // console.log(text);
  // console.log(post.content.caption);
  console.log("TEXT", text);
  let parseBtn = null;
  if (btn !== null) {
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
      // const pasreBtn = btn[0];
    };
  }

  if (post.type === "text") {
    btn !== null
      ? bot.sendMessage(id, post.caption, parseBtn)
      : bot.sendMessage(id, post.caption);
  } else if (post.type === "video") {
    if (btn !== null) {
      bot.sendVideo(id, post.content);
      bot.sendMessage(id, post.caption, parseBtn);
    } else {
      bot.sendVideo(id, post.content);
      bot.sendMessage(id, post.caption);
    }
  } else if (post.type === "photo") {
    if (btn !== null) {
      bot.sendPhoto(id, post.content);
      bot.sendMessage(id, post.caption, parseBtn);
    } else {
      bot.sendPhoto(id, post.content);
      bot.sendMessage(id, post.caption);
    }
  }
};
const sendPost = (type, content) => {
  Users.forEach((user) => {
    if (user.subscribed[`${type}`] === true) {
      // bot.sendMessage(user.id, content);

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
const counterPostsSection = {
  counter: 0,
  type: undefined,
  arrayPost: undefined,
};

const sendSepSectionPost = (id) => {
   bot.sendMessage(id, "Далі...",{
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: `0 / ${arrayPost.length}>>>`,
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
});
// counterPostsSection.arrayPost
const outputPosts = (id) => {
  const mainPost = dinamickPost.filter(post => post.main === true && post.type === counterPostsSection.type);
  const noMainPost = dinamickPost.filter(post => post.main === true && post.type === counterPostsSection.type);
  counterPostsSection.arrayPost = noMainPost;
  mainPost.forEach(post => sendAllTypesMsg(post,id));

}

bot.on("message", (msg) => {
  if (msg.text !== undefined) {
    console.log(msg);
    if (msg.text[0] === "/") return;
  }

  temporyMsg[1] = getTypeFile(msg);

  if (getUser(msg).state !== 0) sendingWrittenPost(msg);
});
const doCommandAction = (command, msg) => {
  sendMsg(msg, "Напишіть пост");
  const user = getUser(msg);
  user.state = 1;
  user.posting[`${command}`] = true;
  temporyMsg[0] = command;
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

const getMsg = (query) => {
  const id = getChatId(query.message);
  const user = getUser(query.message);
  const deletedBtn = transformDeleteData(query.data);

  if (deletedBtn[0] === "delete") {
    deletePost(Number(deletedBtn[1]) + 1);
    deletePost(Number(deletedBtn[1]) + 2);
    return;
  }
  if (typeStaticPost.includes(query.data)) {
    staticPost.forEach((post) => {
      if (post.type === query.data) {
        const infoUserObj = {...post.userInfo};
        infoUserObj.msgId = post.msgId; 
        sendAllTypesMsg(post.content, id, null, infoUserObj);
      }
    });
  }
  switch (query.data) {
    case "requestShelter":
      console.log("good");

      doCommandAction("requestShelter", query.message);
      break;
    case "offerShelter":
      doCommandAction("offerShelter", query.message);
      break;
    case "requestVolunteering":
      doCommandAction("requestVolunteering", query.message);
      break;
    case "offerVolunteering":
      doCommandAction("offerVolunteering", query.message);
      break;
    // case "tab_blood":
    //   info["tab_blood"].forEach((item) => {
    //     bot.sendMessage(id, item);
    //   });
    //   break;
    case "show_users":
      console.log(
        "-----",
        typeStaticPost,
        "-----",
        staticPost,
        "-----",
        dinamickPost
      );
      break;
    case "showShelter":
      bot.sendMessage(id, "Бажаєте переглянути пости пропонованого житла, чи хто потребує його?",{
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Пости житла",
            callback_data: "showShelterOff",
          },
        ],
                [
          {
            text: "Пости потребуючих житло",
            callback_data: "showShelterReq",
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
  });
      break;
    case "showVolunteering":
            bot.sendMessage(id, "Бажаєте переглянути пости пропонованого волонтерства/допомоги, чи хто потребує допомоги?",{
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Пости допомоги/волонтерства",
            callback_data: "showVolunteerinqOff",
          },
        ],
                [
          {
            text: "Пости потребуючих допомоги",
            callback_data: "showVolunteerinqReq",
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
  });
      break;

      case "showShelterOff":
          counterPostsSection.counter = 0;
          counterPostsSection.type = 'offerShelter';
          counterPostsSection.arrayPost = undefined;
          outputPosts();
         break;

      case "showShelterReq":
          counterPostsSection.counter = 0;
          counterPostsSection = 'requestShelter';
          counterPostsSection.arrayPost = undefined;
          outputPosts();
        break;
    case "menu":
      showKeyboard(id);
      // bot.sendMessage(id, "Розділи", showKeyboard(getChatId(msg)));
      break;
    case "edit":
      bot.sendMessage(id, "введіть новий текст");
      break;
    case "deny":
      bot.sendMessage(id, "ви відмінили публікацію");
      //   console.log(query);
      user.state = 0;
      user.posting[`${temporyMsg[0]}`] = false;
      break;
    case "ready":
      // bot.sendMessage(id, temporyMsg);

      if (user.state == 2) {
        user.state = 0;
        // console.log("2");

        // user.posting[`${temporyMsg[0]}`] = false;
        // console.log("3");
        const getMetaData = getTypeAndContent(temporyMsg[1].caption);

        temporyMsg[0] = getMetaData[0];
        temporyMsg[1].caption = getMetaData[1];
        if (!typeStaticPost.includes(temporyMsg[0])) {
          typeStaticPost.push(temporyMsg[0]);
        }
        console.log("query.message_______________++++++++", query.message);

        staticPost.push({
          content: temporyMsg[1],
          type: temporyMsg[0],
          msgId: query.message.message_id,
          userInfo: {
            username: query.message.chat.username,
            name: query.message.chat.first_name,
            id: query.message.chat.id,
          },
        });
        sendPost(temporyMsg[0], temporyMsg[1]);
        console.log("great");
        sendAllTypesMsg(temporyMsg[1], id, query.message.message_id);
      } else if (user.state == 1) {
        user.state = 0;
        console.log("2");

        user.posting[`${temporyMsg[0]}`] = false;
        dinamickPost.push({
          content: temporyMsg[1],
          type: temporyMsg[0],
          msgId: query.message.message_id,
          userInfo: {
            username: query.message.chat.username,
            name: query.message.chat.first_name,
            id: query.message.chat.id,
          },
          main: false,
        });
        bot.sendMessage(getChatId(query.message), "Ваший пост успішно доданий");
      }
  }
};

bot.onText(/\/start/, (msg) => {
  const text = `Вітаємо`;
  const userId = msg.from.id;

  console.log(userId);
  // console.log(isExist);
  console.log(Users);
  const isExist = Users.find((item) => item.id === userId);

  !isExist
    ? Users.push({
        id: msg.from.id,
        username: msg.from.username,
        status: false,
        state: 0,
        subscribed: {
          requestShelter: true,
          offerShelter: true,
          requestVolunteering: true,
          offerVolunteering: true,
        },
        posting: {
          requestShelter: false,
          offerShelter: false,
          requestVolunteering: false,
          offerVolunteering: false,
        },
      })
    : null;

  bot.sendMessage(getChatId(msg), "Ваші розділи туть", getMenuBtn());

  // getMenuBtn();
});

bot.on("callback_query", (query) => {
  getMsg(query);
});

bot.onText(/\/onAlarm/, (msg) => {
  if (isAdmin(msg)) {
    Users.forEach((user) => {
      bot.sendMessage(user.id, "Увага, тривога, знайти укриття!");
    });
  }
});

bot.onText(/\/offAlarm/, (msg) => {
  if (isAdmin(msg)) {
    Users.forEach((user) => {
      bot.sendMessage(user.id, "Відміна тривоги");
    });
  }
});

bot.onText(/\/addPost/, (msg) => {
  if (isAdmin(msg)) {
    getUser(msg).state = 2;
    bot.sendMessage(
      getChatId(msg),
      "Вітаю шановний адмін, напишіть ваше повідомлення у форматі: назва розділу?наповнення"
    );
  }
});
