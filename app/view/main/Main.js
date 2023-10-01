/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Demo.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport'
    ],
    layout: "fit",
    title: "Demo - Performance Compare between For Loop and Functional Programming via Array.map",
    layout: {
        type: "anchor"
    },
    scrollable: true,
    bodyPadding: "0",
    items: [{
        anchor: "100%",
        xtype: "container",
        padding: "10",
        html: `<h3>You can monitor the processing in the browser's console.<h3>
        <h4>This UI will also provide an update upon completion.</h4>
        <h4>The premise is to run identical functioning code, one scenario with for...loops and the other using Array.map(() => {}) arrow function as a callback.</h4>
        <h4>A total of 4 loops are nested within each other, you have control of the first loop's seed number and all other inner loops are based on a count of 10 items.</h4>
        <h4>Be aware that high values do take some time to process.</h4>
        <h4>Console.log messages are asynchoronous, therefore the loops will finish much more quickly than the ability for the debugger's console messages to be displayed.</h4>`
    }, {
        anchor: "100%",
        xtype: 'tabpanel',
        defaults: {
            xtype: "panel",
            layout: {
                type: "vbox",
                pack: "start",
                align: "stretch"
            },
            scrollable: true,
            bodyPadding: "10"
        },
        items: [{
            title: "Simple Console Log",
            itemId: "panel1",
            items: [{
                xtype: "container",
                html: "<h4>Simple processing of nested loops.</h4><h4>All outputs are sent to the console's debugger and we display the timing results in the UI.</h4>"

            }, {
                xtype: 'toolbar',
                items: [{
                    xtype: "numberfield",
                    fieldLabel: "Type a value (empty value defaults to 10).",
                    itemId: "limit",
                    labelWidth: 300,
                    defaultValue: 10,
                    value: 10
                }, {
                    xtype: "button",
                    text: "Start Profiling",
                    listeners: {
                        click: {
                            fn: function(btn) {
                                let p = btn.up('panel[itemId=panel1]');
                                let resultsCmp = p.down('container[itemId=results]');
                                resultsCmp.setHtml("Processing...");
            
                                window.setTimeout(function() {
                                    let numberField = btn.prev();
                                    let v = numberField.getValue();
                                    let defaultValue = numberField.defaultValue;
                                    v = (!v) ? defaultValue : v;
            
                                    if(v <= 0) {
                                        v = defaultValue;
                                        numberField.setValue(v);
                                    }
            
                                    let start1, end1, start2, end2, elapsed1, elapsed2;
                        
                                    let demoArrSize = v;
                                    let largeArr = (() => {
                                        
                                        let arr = [];
                                        for(x = 0; x < demoArrSize; x++) {
                                            arr.push(`Number: ${x + 1}` );
                                        }
                        
                                        return arr;
                                    })();
                        
                                    let smallArr = (() => {
                                        
                                        let arr = [];
                                        for(x = 0; x < 10; x++) {
                                            arr.push(`Inner Number: ${x + 1}` );
                                        }
                        
                                        return arr;
                                    })();
                        
                        
                                    console.log("Iterating via For Loop");
                                    console.log("Start");
                                    start1 = new Date();
                                    console.log(start1);
                        
                                    let largeArrLength = largeArr.length;
                                    let smallArrLength = smallArr.length;
                                    
                                    for(let x = 0; x < largeArrLength; x++) {
                                        console.log(largeArr[x]);
                                        for(let y = 0; y < smallArrLength; y++) {
                                            console.log(smallArr[y]);
                                            for(let z = 0; z < smallArrLength; z++) {
                                                console.log(smallArr[z]);
                                                for(let i = 0; i < smallArrLength; i++) {
                                                    console.log(smallArr[i]);
                                                }       
                                            }   
                                        }
                                    }
                        
                                    end1 = new Date();
                                    console.log(end1);
                                    console.log("End");
                        
                                    elapsed1 = end1 - start1;
                                    console.log(`Elapsed Time is ${elapsed1}`);
                                    console.log("\n**********************\n")
                        
                                    console.log("Iterating Array.map and an arrow function");
                                    console.log("Start");
                                    start2 = new Date();
                                    console.log(start2);
                                    
                                    largeArr.map((item) => {
                                        console.log(item);
                                        smallArr.map((item) => {
                                            console.log(item);
                                            smallArr.map((item) => {
                                                console.log(item);
                                                smallArr.map((item) => console.log(item));
                                            })
                                        });
                                    });
                                    end2 = new Date();
                                    console.log(end2);
                                    console.log("End");
                                    
                                    elapsed2 = end2 - start2;
                                    console.log(`Elapsed Time is ${elapsed2}`);
                        
                                    var msg = `<h2>Results</h2>
                                    <h3>Size of Outer Array is ${demoArrSize}</h3>
                                    <h3>3 embedded inner loops are each the size of 10 items<h3>
                                    <h4>Embedded For...Loop(s)</h4>
                                    <h5>Elapsed Time: ${elapsed1} ms</h5>
                                    <h4>Embedded Array.map(() => {}) with Arrow Function</h4>
                                    <h5>Elapsed Time: ${elapsed2} ms</h5>`
                        
                                    resultsCmp.setHtml(msg);
                                }, 300);
            
                                
                            }
                        }
                    }
                }]
            }, {
                xtype: "container",
                itemId: "results",
                html: ""
            }]
        }, {
            title: "More Complex Processing",
            itemId: "panel2",
            items: [{
                xtype: "container",
                html: `<h4>Using generated arrays to provide a loop structure, each loop calculates a random number based on array's length and then creates a message to determine if the random is lesser than or equal to the array's length.</h4>
                <h4>All outputs are sent to the console's debugger and we display the timing results in the UI.</h4>`
            }, {
                xtype: 'toolbar',
                items: [{
                    xtype: "numberfield",
                    fieldLabel: "Type a value (empty value defaults to 10).",
                    itemId: "limit",
                    labelWidth: 300,
                    defaultValue: 10,
                    value: 10
                }, {
                    xtype: "button",
                    text: "Start Profiling",
                    listeners: {
                        click: {
                            fn: function(btn) {
                                let p = btn.up('panel[itemId=panel2]');
                                let resultsCmp = p.down('container[itemId=results]');
                                resultsCmp.setHtml("Processing...");

                                window.setTimeout(function() {
                                    let numberField = btn.prev();
                                    let v = numberField.getValue();
                                    let defaultValue = numberField.defaultValue;
                                    v = (!v) ? defaultValue : v;
            
                                    if(v <= 0) {
                                        v = defaultValue;
                                        numberField.setValue(v);
                                    }
            
                                    let start1, end1, start2, end2, elapsed1, elapsed2;
                        
                                    let demoArrSize = v;
                                    let largeArr = (() => {
                                        
                                        let arr = [];
                                        for(x = 0; x < demoArrSize; x++) {
                                            arr.push(x);
                                        }
                        
                                        return arr;
                                    })();
                        
                                    let smallArr = (() => {
                                        
                                        let arr = [];
                                        for(x = 0; x < 10; x++) {
                                            arr.push(x);
                                        }
                        
                                        return arr;
                                    })();
                        
                        
                                    console.log("Iterating via For Loop");
                                    console.log("Start");
                                    start1 = new Date();
                                    console.log(start1);
                        
                                    let largeArrLength = largeArr.length;
                                    let smallArrLength = smallArr.length;
                                    let r, m, res, delta;
                                    
                                    for(let x = 0; x < largeArrLength; x++) {
                                        
                                        r = Math.floor(Math.random() * largeArrLength) + 1;
                                        console.log(`Outer (First) Index No: ${x}`);
                                        delta = (r < largeArrLength) ? "lesser than" : " equal to ";
                                        m = `Random number ${r} is ${delta} ${largeArrLength}`;
                                        console.log(m);
                                        
                                        for(let y = 0; y < smallArrLength; y++) {
                                            
                                            r = Math.floor(Math.random() * smallArrLength) + 1;
                                            console.log(`Second Level Index No: ${y}`);
                                            delta = (r < smallArrLength) ? "lesser than" : " equal to ";
                                            m = `Random number ${r} is ${delta} ${smallArrLength}`;
                                            console.log(m);

                                            for(let z = 0; z < smallArrLength; z++) {
                                                
                                                r = Math.floor(Math.random() * smallArrLength) + 1;
                                                console.log(`Third Level Index No: ${z}`);
                                                delta = (r < smallArrLength) ? "lesser than" : " equal to ";
                                                m = `Random number ${r} is ${delta} ${smallArrLength}`;
                                                console.log(m);

                                                for(let i = 0; i < smallArrLength; i++) {
                                                    
                                                    r = Math.floor(Math.random() * smallArrLength) + 1;
                                                    console.log(`Fourth Level Index No: ${i}`);
                                                    delta = (r < smallArrLength) ? "lesser than" : " equal to ";
                                                    m = `Random number ${r} is ${delta} ${smallArrLength}`;
                                                    console.log(m);                                                    
                                                    
                                                }       
                                            }   
                                        }
                                    }
                        
                                    end1 = new Date();
                                    console.log(end1);
                                    console.log("End");
                        
                                    elapsed1 = end1 - start1;
                                    console.log(`Elapsed Time is ${elapsed1}`);

                                    console.log("\n**********************\n");
                                    console.log("\n**********************\n");
                                    console.log("\n**********************\n");
                        
                                    console.log("Iterating Array.map and an arrow function");
                                    console.log("Start");
                                    start2 = new Date();
                                    console.log(start2);
                                    
                                    largeArr.map((item, idx, length) => {
                                        
                                        let r = Math.floor(Math.random() * length) + 1;
                                        console.log(`Outer (First) Index No: ${idx}`);
                                        delta = (r < length) ? "lesser than" : " equal to ";
                                        let m = `Random number ${r} is ${delta} ${length}`;
                                        console.log(m);
                                        
                                        smallArr.map((item, idx, length) => {

                                            let r = Math.floor(Math.random() * length) + 1;
                                            console.log(`Second Level Index No: ${idx}`);
                                            delta = (r < length) ? "lesser than" : " equal to ";
                                            let m = `Random number ${r} is ${delta} ${length}`;
                                            console.log(m);

                                            smallArr.map((item, idx, length) => {

                                                let r = Math.floor(Math.random() * length) + 1;
                                                console.log(`Third Level Index No: ${idx}`);
                                                delta = (r < length) ? "lesser than" : " equal to ";
                                                let m = `Random number ${r} is ${delta} ${length}`;
                                                console.log(m);                                                

                                                smallArr.map((item, idx, length) => {

                                                    let r = Math.floor(Math.random() * length) + 1;
                                                    console.log(`Fourth Level Index No: ${idx}`);
                                                    delta = (r < length) ? "lesser than" : " equal to ";
                                                    let m = `Random number ${r} is ${delta} ${length}`;
                                                    console.log(m);                                                

                                                });
                                            })
                                        });
                                    });
                                    end2 = new Date();
                                    console.log(end2);
                                    console.log("End");
                                    
                                    elapsed2 = end2 - start2;
                                    console.log(`Elapsed Time is ${elapsed2}`);
                        
                                    var msg = `<h2>Results</h2>
                                    <h3>Size of Outer Array is ${demoArrSize}</h3>
                                    <h3>3 embedded inner loops are each the size of 10 items<h3>
                                    <h4>Embedded For...Loop(s)</h4>
                                    <h5>Elapsed Time: ${elapsed1} ms</h5>
                                    <h4>Embedded Array.map(() => {}) with Arrow Function</h4>
                                    <h5>Elapsed Time: ${elapsed2} ms</h5>`
                        
                                    resultsCmp.setHtml(msg);
                                }, 300);
            
                                
                            }
                        }
                    }
                }]
            }, {
                xtype: "container",
                itemId: "results",
                html: ""
            }]
        }]
    }]
    
});



