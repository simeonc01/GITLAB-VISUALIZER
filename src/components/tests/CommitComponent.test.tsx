// import renderer from "react-test-renderer";

// const testData = [
//     {
//         "title": "Merge branch '27-fix-typos-in-types-ts' into 'main'",
//         "author": "Victor Windsor Torbjørn Norris",
//         "commited_date": "26/09",
//         "message": "Merge branch '27-fix-typos-in-types-ts' into 'main'\n\nrefactor(#27): fix the typos in types.ts\n\nCloses #27\n\nSee merge request it2810-h22/Team-29/prosjekt2!20"
//     },
//     {
//         "title": "refactor(#27): fix the typos in types.ts",
//         "author": "bjerkemj",
//         "commited_date": "26/09",
//         "message": "refactor(#27): fix the typos in types.ts\n"
//     },
//     {
//         "title": "Merge branch '5-create-simple-design-prototype' into 'main'",
//         "author": "Victor Windsor Torbjørn Norris",
//         "commited_date": "19/09",
//         "message": "Merge branch '5-create-simple-design-prototype' into 'main'\n\nResolve \"create simple design/prototype\"\n\nCloses #10\n\nSee merge request it2810-h22/Team-29/prosjekt2!19"
//     },
//     {
//         "title": "feature(#5): properly displays projectname",
//         "author": "bjerkemj",
//         "commited_date": "19/09",
//         "message": "feature(#5): properly displays projectname\n"
//     },
//     {
//         "title": "Add package-lock to .gitignore",
//         "author": "bjerkemj",
//         "commited_date": "19/09",
//         "message": "Add package-lock to .gitignore\n"
//     }
// ]

// it("Only component test", () => {
//   const comp = renderer.create(<CommitTable rows ={[]} />).toJSON();
//   expect(comp).toMatchSnapshot();
// });

// it("Test with data", () => {
//     const comp = renderer.create(<CommitTable rows ={testData} />).toJSON();
//     expect(comp).toMatchSnapshot();
//   });
