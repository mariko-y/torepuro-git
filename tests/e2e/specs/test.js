// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("login to register to login", () => {
    cy.visit("/");
    cy.get("a")
      .eq(1)
      .click();
    cy.contains("button", "登録");
    cy.get("a")
      .eq(0)
      .click();
    cy.contains("button", "ログイン");
  });

  it("register to mainpage", () => {
    cy.get("a")
      .eq(1)
      .click();
    cy.get("input")
      .eq(0)
      .clear()
      .type("nakamura");
    cy.get("input")
      .eq(1)
      .clear()
      .type("eiji");
    cy.wait(5000);
    cy.get("button")
      .eq(0)
      .click();
    cy.wait(3000);
    cy.contains("h2", "かんばんボード");
  });
  it("can logout", () => {
    cy.get("button")
      .eq(0)
      .click();
    cy.wait(3000);
    cy.contains("button", "ログイン");
  });
  it("login to mainpage", () => {
    cy.get("input")
      .eq(0)
      .clear()
      .type("nakamura");
    cy.get("input")
      .eq(1)
      .clear()
      .type("eiji");
    cy.get("button")
      .eq(0)
      .click();
    cy.contains("h2", "かんばんボード");
  });
  it("addModal successfully loads and closes", () => {
    cy.get(".story tr").should("not.contain", "abcdefghij");
    cy.get("button")
      .eq(2)
      .click();
    cy.get("input")
      .eq(0)
      .clear()
      .type("abcdefghij");
    cy.get("button")
      .eq(3)
      .click();
    cy.get(".story tr").should("not.contain", "abcdefghij");
  });
  it("addModal successfully saves", () => {
    cy.get(".story tr").should("not.contain", "abcdefghij");
    cy.get("button")
      .eq(2)
      .click();
    cy.get("input")
      .eq(0)
      .clear()
      .type("abcdefghij");
    cy.get("button")
      .eq(4)
      .click();
    cy.wait(2000);
    cy.get(".story tr").should("contain", "abcdefghij");
  });

  it("detailModal successfully loads and closes", () => {
    cy.get(".story tr").should("contain", "abcdefghij");
    cy.get("tbody:first tr td")
      .last()
      .click();
    cy.get("input")
      .eq(1)
      .clear()
      .type("jihgfedcba");
    cy.get("select").select("Review");
    cy.get("textarea")
      .eq(1)
      .clear()
      .type("内容100");
    cy.get("button")
      .eq(5)
      .click();
    cy.get(".story tr").should("contain", "abcdefghij");
    cy.get(".story tr").should("not.contain", "jihgfedcba");
  });
  it("detailModal successfully saves", () => {
    cy.get(".story tr").should("contain", "abcdefghij");
    cy.get("tbody:first tr td")
      .last()
      .click();
    cy.get("input")
      .eq(1)
      .clear()
      .type("jihgfedcba");
    cy.get("select").select("Review");
    cy.get("textarea")
      .eq(1)
      .clear()
      .type("内容100");
    cy.get("button")
      .eq(6)
      .click();
    cy.get(".story tr").should("not.contain", "abcdefghij");
    cy.get(".story tr").should("contain", "jihgfedcba");
  });
  it("detailModal successfully deletes (confirm:cancel)", () => {
    cy.get(".story tr").should("contain", "jihgfedcba");
    cy.get("tbody")
      .eq(2)
      .find("tr td")
      .last()
      .click();

    cy.get("button")
      .eq(7)
      .click();
    cy.on("window:confirm", () => false);
    cy.get(".story tr").should("contain", "jihgfedcba");
  });
  it("detailModal successfully deletes (confirm:OK) ", () => {
    cy.get("button")
      .eq(7)
      .click();
    cy.on("window:confirm", () => true);
    cy.wait(2000);
    cy.get(".story tr").should("not.contain", "jihgfedcba");
  });

  it("account remove", () => {
    cy.get("button")
      .eq(1)
      .click();
    cy.contains("button", "ログイン");
  });
});
