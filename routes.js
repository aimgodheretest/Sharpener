const fs = require("fs");

const requestHandler = (req, res) => {
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

        fs.writeFile("formValues2.txt", formValues, (err) => {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          res.end();
        });
      });
    } else {
      if (url === "/read") {
        //read from file

        fs.readFile("formValues2.txt", (err, data) => {
          // console.log(data.toString());

          res.end(`
            <h1>${data.toString()}</h1>`);
        });
      }
    }
  }
};

const anotherFunction = () => {
  console.log("This is Another Test Function");
};

// module.exports = { requestHandler, anotherFunction };

//another way of exporting;
module.exports.handler = requestHandler;
module.exports.testFunction = anotherFunction;
