it('Doesn\'t test the sample config file', () => {
    expect(true).toBeTruthy();
});

// Uncomment below to test config

// import config from '.';
// import getPropByName from 'utils/get-prop-by-name';

// // Test base index.js file
// it('Has a client name', () => {
//     expect(config.clientName).toBeDefined();
// });

// it('Has a module order', () => {
//     expect(config.moduleOrder).toBeDefined();
// });

// it('Has modules', () => {
//     expect(config.modules).toBeDefined();
// });

// it('Number of modules is equal to the number in modules order', () => {
//     expect(Object.keys(config.modules).length).toEqual(config.moduleOrder.length);
// });

// // test individual modules
// if (config.moduleOrder) {
//     config.moduleOrder.forEach(moduleId => {
//         const module = config.modules[moduleId];
//         const moduleName = module && module.moduleName ? module.moduleName : 'MISSING NAME';

//         it('Has a valid module id', () => {
//             expect(module).toBeDefined();
//         });

//         // check the icon was loading from FontAwesome
//         it(`${moduleName} loaded an icon from FontAwesome`, () => {
//             expect(module.icon.iconName).toBeDefined();
//         });

//         // check that the module has all required properties
//         const requiredProps = [
//             'id',
//             'icon',
//             'moduleName',
//             'itemName',
//             'itemNamePlural',
//             'capabilities',
//             'filtering',
//             'views',
//             'itemProps'
//         ];

//         requiredProps.forEach(prop => {
//             it(`${moduleName} has ${prop}`, () => {
//                 expect(module[prop]).toBeDefined();
//             });
//         });

//         // check typeof variables to be sure they match what is expected
//         const expectedPropTypes = {
//             moduleName: 'string',
//             id: 'string',
//             itemName: 'string',
//             itemNamePlural: 'string',
//             capabilities: {
//                 reorderable: 'boolean',
//                 editable: 'boolean',
//                 deleteable: 'boolean',
//                 deleteIdProp: 'string'
//             },
//             filtering: {
//                 searchFields: 'array',
//                 filterFields: 'array',
//                 sortable: 'boolean'
//             },
//             defaultSort: { field: 'string', desc: 'boolean' },
//             itemsPerPage: 'number',
//             views: {
//                 displayType: 'string',
//                 defaultView: 'string',
//                 table: 'object',
//                 grid: 'object'
//             },
//             modalGrid: 'array',
//             itemProps: 'array'
//         };

//         for (const typesRoot in expectedPropTypes) {
//             if (expectedPropTypes.hasOwnProperty(typesRoot)) {
//                 const expectedType = expectedPropTypes[typesRoot];

//                 if (typeof expectedType === 'object') {
//                     for (const childType in expectedType) {
//                         if (expectedType.hasOwnProperty(childType)) {
//                             const childExpected = expectedType[childType];
//                             const match = checkTypeMatches(childType, module[typesRoot][childType], childExpected);

//                             it(`${moduleId}.${childType} is a ${childExpected}`, () => {
//                                 expect(match).toBeTruthy();
//                             });
//                         }
//                     }
    
//                     continue;
//                 }
                
//                 const match = checkTypeMatches(typesRoot, module[typesRoot], expectedType);
//                 it(`${moduleId}.${typesRoot} is a ${expectedType}`, () => {
//                     expect(match).toBeTruthy();
//                 });
//             }
//         }

//         // check that itemProps specified in config exist
//         if (module.capabilities && module.capabilities.deleteIdProp) {
//             const deleteIdProp = module.capabilities.deleteIdProp;

//             it(`${moduleId}.deleteIdProp uses a valid itemProp (${deleteIdProp})`, () => {
//                 expect(getPropByName(moduleId, deleteIdProp)).toBeTruthy();
//             });
//         }
    
//         if (module.filtering) {
//             if (module.filtering.filterFields) {
//                 module.filtering.filterFields.forEach(prop => {
//                     it(`${moduleId}.filtering contains valid itemProps (${prop})`, () => {
//                         expect(getPropByName(moduleId, prop)).toBeTruthy();
//                     });
//                 });
//             }
    
//             if (module.filtering.searchFields) {
//                 module.filtering.searchFields.forEach(prop => {
//                     it(`${moduleId}.searchFields contains valid itemProps (${prop})`, () => {
//                         expect(getPropByName(moduleId, prop)).toBeTruthy();
//                     });
//                 });
//             }
//         }
    
//         if (module.defaultSort && module.defaultSort.field) {
//             const sortField = module.defaultSort.field;

//             // id and sort are default fields not specified in the itemProps
//             if (sortField !== 'id' && sortField !== 'sort') {
//                 it(`${moduleId}.defaultSort.field uses a valid itemProp (${sortField})`, () => {
//                     expect(getPropByName(moduleId, sortField)).toBeTruthy();
//                 });
//             }
//         }
    
//         if (module.archive && module.archive.field) {
//             const archiveField = module.archive.field;
//             const archiveProp = getPropByName(moduleId, archiveField);

//             it(`${moduleId}.archive.field uses a valid itemProp (${archiveField})`, () => {
//                 expect(archiveProp).toBeTruthy();
//             });

//             it(`${moduleId}.archive.field is a datepicker type`, () => {
//                 expect(archiveProp.type).toEqual('datepicker');
//             });
//         }
    
//         if (module.views && module.views.table && module.views.table.columns) {
//             const cols = module.views.table.columns;
    
//             cols.forEach(prop => {
//                 it(`${moduleId}.views.table.columns contains valid itemProps (${prop.name})`, () => {
//                     expect(getPropByName(moduleId, prop.name)).toBeTruthy();
//                 });
//             });
//         }
    
//         if (module.views && module.views.grid && module.views.grid.layout) {
//             const cols = module.views.grid.layout;
    
//             cols.forEach(prop => {
//                 it(`${moduleId}.views.grid.layout contains valid itemProps (${prop.name})`, () => {
//                     expect(getPropByName(moduleId, prop.name)).toBeTruthy();
//                 });
//             });
//         }
    
//         if (module.modalGrid) {
//             for (let i = 0, e = module.modalGrid.length; i < e; i++) {
//                 for (let x = 0, y = module.modalGrid[i].length; x < y; x++) {
//                     const modalProp = module.modalGrid[i][x];
//                     it(`${moduleId}.modalGrid contains valid itemProps (${modalProp})`, () => {
//                         expect(getPropByName(moduleId, modalProp)).toBeTruthy();
//                     });
//                 }
//             }
//         }

//     });
// }

// function checkTypeMatches(p, v, e) {
//     if (e === 'array') {
//         if (!Object.prototype.toString.call(v) === '[object Array]' ) {
//             return false;
//         }

//         return true;
//     }

//     if (typeof v !== e) {
//         return false;
//     }

//     return true;
// }