import axios from "axios";

export class Parser {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  get parsed() {
    return axios
      .get(this.url, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        return JSON.stringify(res.data, null, 4);
      })
      .catch((e) => {
        throw new Error(`Catched error: ${e}`);
      });
  }

  get names() {
    return this.parsed.then((data) => {
      const names: string[] = [];
      if (data) {
        for (let i = 0; i < data.split("user-name js-anim-h2").length; i++) {
          const splited = data.split(`user-name js-anim-h2\\">`)[i + 1];
          if (splited) names.push(splited.split("<")[0]);
        }
      }
      return names;
    });
  }
}
