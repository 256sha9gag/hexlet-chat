export default {
  translation: {
    header: {
      logo: 'Hexlet Chat',
      signOutButton: 'Sign out',
    },
    signIn: {
      title: 'Sign in',
      usernameLabel: 'Username',
      passwordLabel: 'Password',
      button: 'Sign in',
      signUpLink: 'Sign up',
      signUpFooter: 'No account?',
    },
    signUp: {
      title: 'Sign up',
      usernameLabel: 'Username',
      passwordLabel: 'Password',
      passwordConfirmationLabel: 'Confirm password',
      button: 'Sign up',
    },
    notFound: {
      title: 'Page not found',
      footer: 'But you can go',
      link: 'to the main page',
    },
    chat: {
      сounter: {
        count_one: '{{count}} message',
        count_many: '{{count}} messages',
      },
    },
    newMessageForm: {
      inputLabel: 'Enter a message...',
      ariaLabel: 'New message',
      button: 'Send',
    },
    sideNavbar: {
      channels: 'Channels',
      control: 'Channel management',
      remove: 'Remove',
      rename: 'Rename',
    },
    errors: {
      required: 'Required field',
      textLength: 'From 3 to 20 characters',
      passSingInLength: 'At least 5 characters',
      passLength: 'At least 6 characters',
      authFail: 'Invalid username or password',
      passConfirmation: 'Passwords must match',
      signUpFail: 'Such a user already exists',
      notOneOf: 'Must be unique',
    },
    modal: {
      add: 'Add Channel',
      formLabel: 'Name channel',
      sendButton: 'Send',
      cancelButton: 'Cancel',
      removeTitle: 'Remove Channel',
      removeBody: 'Are you sure?',
      removeButton: 'Remove',
      rename: 'Rename channel',
    },
    toast: {
      error: 'Connection error',
      create: 'Channel created',
      rename: 'Channel renamed',
      remove: 'Channel removed',
    },
    rollbar: {
      login: 'Login post request error',
      getData: 'Error of the get request to get data',
      creatUser: 'Error in the post request to create a new user',
      newMeassage: 'Error sending a new message',
      newChannel: 'Error sending a new channel',
      removeChannel: 'Error sending new channel name',
      renameChannel: 'Error sending channel deletion',
    },
  },
};
