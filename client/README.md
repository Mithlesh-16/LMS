# LMS Frontend
### Setup Instruction

1. clone the repository
```
    git clone "https://github.com/Mithlesh-16/lms"
```

2. Move into the repository
```
cd lms-client
```
3. install depenedencies
```
npm i
```

4. run the server
```
npm run dev
```
5. install tailwind css

### Configure auto import sort eslint
1. install simple import sort
```
npm i -D eslint-plugin-simple-import-sort
```
2. Add rule in `eslint.config.js`
```
"simple-import-sort/imports":"error"
```
3. Add simple-import sort plugin into 'eslint.config.js'
```
plugins: [..., 'simple-import-sort']
```
4. To enable auto import sort on file save in vscode
-open settings.json
- add the following config
```
"editor.codeActionsOnSave":{
    "source.fixAll.eslint": true
}
```