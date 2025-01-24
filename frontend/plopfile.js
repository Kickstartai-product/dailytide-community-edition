module.exports = function (plop) {
  plop.setGenerator('components', {
    description: 'create a new Component or Page',
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of component would you like to create?',
        choices: ['Component', 'Page'],
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component? Use space in multi-word names.',
        validate: value => {
          if (/.+/.test(value)) {
            return true;
          }
          return 'name is required';
        },
      },
    ],
    actions: data => {
      const actions = [];
      const type = data.type;
      const isPage = type === 'Page';
      const pathTemplate = isPage ? `src/app/{{dashCase name}}` : `src/components/{{pascalCase name}}`;

      const entryFileName = isPage ? 'page' : 'index';
      const templateFileName = isPage ? 'Page' : 'component';

      if (!data.name) return;

      actions.push(
        {
          type: 'add',
          path: `${pathTemplate}/${entryFileName}.tsx`,
          templateFile: `build-tools/plop-templates/${templateFileName}.hbs`,
        },
        {
          type: 'add',
          path: `${pathTemplate}/${entryFileName}.module.scss`,
          templateFile: `build-tools/plop-templates/style.hbs`,
        },
      );

      if (!isPage) {
        actions.push({
          type: 'add',
          path: `${pathTemplate}/index.stories.tsx`,
          templateFile: `build-tools/plop-templates/story.hbs`,
        });
      }

      return actions;
    },
  });
};
