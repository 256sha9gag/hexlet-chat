export default {
  translation: {
    navbar: {
      logo: 'Hexlet Chat',
      signOutButton: 'Выйти',
    },
    sidebar: {
      title: 'Каналы',
      removeButton: 'Удалить',
      renameButton: 'Переименовать',
    },
    signIn: {
      title: 'Войти',
      nameLabel: 'Ваш ник',
      passwordLabel: 'Пароль',
      sendButton: 'Войти',
      signUpLink: 'Регистрация',
      signUpFooter: 'Нет аккаунта?',
    },
    notFound: {

    },
    signUp: {
      title: 'Регистрация',
      nameLabel: 'Имя',
      passwordLabel: 'Пароль',
      passwordConfirmationLabel: 'Подтверждение пароля',
      sendButton: 'Зарегистрироваться',
      loginLink: 'Войти',
    },
    chat: {
      placeholder: 'Сообщение...',
      sendButton: 'Отправить',
    },
    errors: {
      empty: 'Поле не должно быть пустым',
      nameLength: 'Имя должно быть от 3 до 20 символов',
      passLength: 'Пароль должен быть от 4 символов',
      passConfirmation: 'Пароли не совпадат',
      channelTitleUniq: 'Такой канал уже существует',
      channelTitleLength: 'Название канала должно быть от 2 до 20 символов',
      chat: 'Сообщение должно быть строкой',
      auth: 'Ошибка аутентификации',
      conflict: 'Такое имя уже существует',
    },
    modal: {
      add: 'Добавить канал',
      rename: 'Переименовать канал',
      remove: 'Удалить канал',
      removeButton: 'Удалить',
      renameButton: 'Переименовать',
      addButton: 'Добавить',
      closeButton: 'Закрыть',
      confirmation: 'Вы действительно хотите удалить канал: {{channel.name}}?',
      successAdded: 'Канал успешно добавлен',
      successRenamed: 'Канал успешно переименован',
      successRemoved: 'Канал успешно удален',
    },
  },
};
