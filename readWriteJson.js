const fs = require('fs');

class ReadWriteJson {
  readWriteToJson() {
    // Reading the  JSON file
    const filePath = 'heartrate.json';
    const rawData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(rawData);

    let values = [];
    for (let i = 0; i < jsonData.length; i++) {
      values.push(jsonData[i].beatsPerMinute); //Storing the values into array
    }

    //Sorting the array values in ascending order
    let sortedArray = values.sort((a, b) => a - b);
    let minimum = sortedArray[0];
    let maximum = sortedArray[sortedArray.length - 1];

    //Median Calculation
    let median=0, mid=0,afterMid =0;

    let len = sortedArray.length;
    if (len % 2 == 0) {
      mid = len / 2;
      afterMid = ((len / 2) + 1);
      median = (sortedArray[mid] + sortedArray[afterMid]) / 2;
    }
    else {
      mid = (len + 1) / 2;
      median = sortedArray[mid];
    }


    const dateTimeStamp = jsonData[len - 1].timestamps.startTime;
    
    const currentDate = new Date(dateTimeStamp); 

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;


    const dataToWrite = {
      currentdate: formattedDate,
      min: minimum,
      max: maximum,
      median: median,
      latestDataTimestamp: dateTimeStamp
    };

    // Convert the JavaScript object or array to a JSON string
    const outputjsonData = JSON.stringify(dataToWrite, null, 2);
    const outputfilePath = 'output.json';
    fs.writeFileSync(outputfilePath, outputjsonData);
  }
}

let r=new ReadWriteJson(); //object creation for the class
r.readWriteToJson();
