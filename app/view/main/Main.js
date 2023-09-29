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
    bodyPadding: "40",
    scrollable: true,
    title: "Demo - Performance Compare between For Loop and Functional Programming via Array.map",
    items: [{
        xtype: "container",
        html: "<h1>You can monitor result in the browser's console.<h1><h2>Each scenario resolves around going to embedded loops.  A major loop (preset to 10) in the code and all inner loops are based on a count of 10 items."
    }, {
        xtype: 'toolbar',
        items: [{
            xtype: "numberfield",
            fieldLabel: "Type a value (beware, values beyond 100 may take a while to process) (no value defaults to 10)",
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
                        let cmp = btn.up('app-main');
                        let resultsCmp = cmp.down('container[itemId=results]');
                        resultsCmp.setHtml("");

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
                            
                            for(let x = 0; x < largeArrLength; x++) {
                                console.log(largeArr[x]);
                                let smallArrLength = smallArr.length;
                                for(y = 0; y < smallArrLength; y++) {
                                    console.log(smallArr[y]);
                                    for(z = 0; z < smallArrLength; z++) {
                                        console.log(smallArr[z]);
                                        for(i = 0; i < smallArrLength; i++) {
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
                            <h4>For Loop</h4>
                            <h5>Elapsed Time: ${elapsed1} ms</h5>
                            <h4>Array Map with Arrow Function</h4>
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

});
