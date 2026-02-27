// let arr = [1, 2, 3, 4];
// let bufferValue = Buffer.from(arr);
// console.log(bufferValue);

// let value1 = "ABC";
// let bufferValue1 = Buffer.from(value1);

// let value2 = " XYZ";
// let bufferValue2 = Buffer.from(value2);
// console.log(bufferValue1, bufferValue2);

// let combinedBuffer = Buffer.concat([bufferValue1, bufferValue2]);
// console.log(combinedBuffer);
// console.log(combinedBuffer.toString());

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //url,method
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<form action="/message" method="POST">
        <label>Name:</label>
        <input type="text" name="name"></input>
        <button type="submit">Add</button>
      </form>
      `,
    );
  } else {
    if (url === "/message") {
      // console.log("message url hit");
      // res.end("<h1>Hello from message</h1>")

      let body = [];

      req.on("data", (chunks) => {
        body.push(chunks);
      });

      req.on("end", () => {
        let buffer = Buffer.concat(body);
        console.log(buffer);

        let formData = buffer.toString();
        console.log(formData);

        const formValues = formData.split("=")[1];

        fs.writeFile("formValues.txt", formValues, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    } else {
      if (url === "/read") {
        //read from file

        fs.readFile("formValues.txt", (err, data) => {
          // console.log(data.toString());

          res.end(`
            <h1>${data.toString()}</h1>`);
        });
      }
    }
  }
});

server.listen(3000, () => {
  console.log("Server is running on port:3000");
});
