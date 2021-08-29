module.exports = {
  async test(api) {
    describe("Testing book requests", () => {
      describe("post /book", () => {
        it("should be able to create a book", async () => {
          const data = {
            title: "O Hobbit",
            author: "J R R Tolkien",
            publisher: "",
            synospsis: "",
            edition: "",
            isbn: "1234567"
          }
          
          await api.post("/books", data)
            .then(response => expect(response.status).toEqual(201))
        })
      })

      describe("get /books", () => {
        it("should be able to create a book", async () => {
          const data = {
            title: "O Hobbit",
            author: "J R R Tolkien",
            publisher: "",
            synospsis: "",
            edition: "",
            isbn: "1234567"
          }
          
          await api.post("/books", data)
            .then(response => expect(response.status).toEqual(201))
        })
      })
    })
  }
}