const fs = require("fs");

const componentName = process.argv[2];
const componentPath = process.argv[3];

const componentTemplate = `import s from './${componentName}.module.css';

const ${componentName} = () => {
  return (
    <div className={s.root}>
      
    </div>
  );
};

export default ${componentName};`;

const indexTemplate = `import ${componentName} from './${componentName}';

export default ${componentName};`;

const createComponents = new Promise((resolve, reject) => {
  const path = `./src/${componentPath}/${componentName}`;

  if (fs.existsSync(path)) {
    reject("Error : Components already exist");
  }

  fs.mkdir(path, { recursive: true }, (err) => {
    if (err !== null) {
      reject(err);
    } else {
      resolve(path);
    }
  });
});

console.log(`>>>>: Started to create a component : ${componentName}`);
createComponents
  .then(async (dirPath) => {
    await fs.writeFile(
      `${dirPath}/${componentName}.js`,
      componentTemplate,
      (err) => {
        if (err !== null) {
          Promise.reject(err);
        }
      }
    );

    return dirPath;
  })
  .then(async (dirPath) => {
    await fs.writeFile(
      `${dirPath}/${componentName}.module.css`,
      ".root {\n\n}",
      (err) => {
        if (err !== null) {
          Promise.reject(err);
        }
      }
    );

    return dirPath;
  })
  .then(async (dirPath) => {
    await fs.writeFile(`${dirPath}/index.js`, indexTemplate, (err) => {
      if (err !== null) {
        console.log("Something wrong ", err);
      }
    });
    console.log(
      `>>>>: You have successfully created ${componentName}, find it at ${dirPath}`
    );
  })
  .catch((err) => {
    console.log("####: We got a problem - ", err);
  });
