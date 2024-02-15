import React, { useRef, useEffect, useState } from "react";
import db from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Pivot } from "react-flexmonster";

function FlexmonsterTable() {
  const [pivotData, setPivotData] = useState(null);
  const pivotRef = useRef(null); // Step 1: Set up a ref for the Flexmonster component
  const saveDataToFirestore = async () => {
    if (pivotRef.current && pivotRef.current.flexmonster) {
      const flexmonsterInstance = pivotRef.current.flexmonster;
      const report = flexmonsterInstance.getReport(); // Get the current report state

      const docRef = doc(db, "documents", "Test"); // Reference to the Firestore document

      try {
        await updateDoc(docRef, { table: JSON.stringify(report) }); // Save the report object as a JSON string
        console.log(
          "Flexmonster table data saved to Firestore in the correct format"
        );
      } catch (error) {
        console.error("Error saving Flexmonster data to Firestore :", error);
      }
    }
  };

  useEffect(() => {
    // Fetch data from Firestore and set up the pivot table
    const fetchData = async () => {
      const docRef = doc(db, "documents", "Test");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const parsedData = JSON.parse(data.table);
        setPivotData(parsedData);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Attach event listeners to the Flexmonster table for user interactions
    if (pivotRef.current && pivotRef.current.flexmonster) {
      const flexmonsterInstance = pivotRef.current.flexmonster;

      const eventsToSave = [
        "reportchange",
        "cellclick",
        "filterchange",
        "sortchange",
      ];
      eventsToSave.forEach((eventName) => {
        flexmonsterInstance.on(eventName, saveDataToFirestore);
        console.log("saved to Firestore");
      });

      return () => {
        // Clean up event listeners
        eventsToSave.forEach((eventName) => {
          flexmonsterInstance.off(eventName, saveDataToFirestore);
        });
      };
    }
  }, [pivotRef.current]); // Re-attach listeners if pivotRef.current changes

  return (
    <>
      <h1 className="page-title">Pivot Table Demo</h1>
      <div className="App">
        {pivotData && (
          <Pivot
            ref={pivotRef} // Attach the ref to the Pivot component
            toolbar={true}
            beforetoolbarcreated={(toolbar) => {
              toolbar.showShareReportTab = true;
            }}
            shareReportConnection={{
              url: "https://olap.flexmonster.com:9500",
            }}
            width="100%"
            height={600}
            report={pivotData}
          />
        )}
      </div>
    </>
  );
}

export default FlexmonsterTable;
