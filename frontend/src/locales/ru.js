export default {
  translation: {
    header: {
      logo: 'Hexlet Chat',
      signOutButton: 'Выйти',
    },
    signIn: {
      title: 'Войти',
      usernameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      button: 'Войти',
      signUpLink: 'Регистрация',
      signUpFooter: 'Нет аккаунта?',
    },
    signUp: {
      title: 'Регистрация',
      usernameLabel: 'Имя пользователя',
      passwordLabel: 'Пароль',
      passwordConfirmationLabel: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
    },
    notFound: {
      title: 'Страница не найдена',
      footer: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    chat: {
      сounter: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },
    newMessageForm: {
      inputLabel: 'Введите сообщение...',
      ariaLabel: 'Новое сообщение',
      button: 'Отправить',
    },
    sideNavbar: {
      channels: 'Каналы',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    errors: {
      required: 'Обязательное поле',
      textLength: 'От 3 до 20 символов',
      passSingInLength: 'Не менее 5 символов',
      passLength: 'Не менее 6 символов',
      passConfirmation: 'Пароли должны совпадать',
      authFail: 'Неверные имя пользователя или пароль',
      signUpFail: 'Такой пользователь уже существует',
      notOneOf: 'Должно быть уникальным',
    },
    modal: {
      add: 'Добавить канал',
      sendButton: 'Отправить',
      cancelButton: 'Отменить',
      removeTitle: 'Удалить канал',
      removeBody: 'Уверены?',
      removeButton: 'Удалить',
      rename: 'Переименовать канал',
    },
    toast: {
      error: 'Ошибка соединения',
      create: 'Канал создан',
      rename: 'Канал переименован',
      remove: 'Канал удалён',
    },
    rollbar: {
      login: 'Ошибка post-запроса вход',
      getData: 'Ошибка get-запроса на полученние данных',
      creatUser: 'Ошибка post-запроса на создание нового пользователя',
      newMeassage: 'Ошибка отправки нового сообщения',
      newChannel: 'Ошибка отправки нового канала',
      renameChannel: 'Ошибка отправки нового имени канала',
      removeChannel: 'Ошибка отправки удаления канала',
    },
  },
};
