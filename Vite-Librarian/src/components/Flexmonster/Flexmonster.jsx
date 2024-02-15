import React, { useRef, useEffect, useState } from 'react';
import db from '../../firebase'; 
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Pivot } from 'react-flexmonster';


function FlexmonsterTable() {
    const [pivotData, setPivotData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'documents', 'test');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log("Data from Firestore:", data); 
                const parsedData = JSON.parse(data.table); 
                setPivotData(parsedData);
            } else {
                console.log("No such document!");
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <h1 className="page-title">Pivot Table Demo</h1>
            <div className="App">
                {pivotData && (
                    <Pivot
                        toolbar={true}
                        beforetoolbarcreated={toolbar => {
                            toolbar.showShareReportTab = true;
                        }}
                        shareReportConnection={{
                            url: "https://olap.flexmonster.com:9500"
                        }}
                        width="100%"
                        height={600}
                        report={pivotData}
                        // licenseKey="Z7LI-XC5D0Z-0W6P5V-035A5K"
                    />
                )}
            </div>
        </>
    );
}

export default FlexmonsterTable;
