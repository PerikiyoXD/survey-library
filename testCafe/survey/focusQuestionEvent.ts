import { url, initSurvey, frameworks, getSurveyResult } from "../helper";
import { Selector, ClientFunction } from "testcafe";

const title = "focusFirstQuestionAutomatic";

const json = {
  pages: [
    {
      elements: [
        {
          type: "text",
          name: "q1"
        },
        {
          type: "text",
          name: "q2"
        }
      ]
    }
  ]
};

frameworks.forEach(async framework => {
  fixture`${framework} ${title}`.page`${url}${framework}`.beforeEach(
    async t => {
    }
  );
  test("Check question focus event", async t => {
    await initSurvey(framework, json);
    await ClientFunction(() => {
      window["raisedFocusEvent"] = null;
      window["survey"].onFocusInQuestion.add(function (sender, options) {
        window["raisedFocusEvent"] = true;
      });
    })();
    await t.click(Selector(".sv_qstn input").nth(1));
    await t.expect(ClientFunction(() => window["raisedFocusEvent"])()).ok();
  });

  test("enterKeyAction", async (t) => {
    const characterCounter = Selector(".sv-remaining-character-counter");

    await initSurvey(framework, {
      "logoPosition": "right",
      "pages": [
        {
          "name": "page1",
          "elements": [
            {
              "type": "text",
              "name": "question1"
            },
            {
              "type": "dropdown",
              "name": "question2",
              "choices": ["item1", "item2"]
            },
            {
              "type": "text",
              "name": "question3"
            }
          ]
        },
        {
          "name": "page2",
          "elements": [
            {
              "type": "text",
              "name": "question4"
            }
          ]
        }
      ]
    });

    await ClientFunction(() => {
      window["Survey"].settings.enterKeyAction = "loseFocus";
    })();

    const q1Input = Selector("div[data-name=question1] input");
    const q2Input = Selector("div[data-name=question2] input");
    const q3Input = Selector("div[data-name=question3] input");
    const q4Input = Selector("div[data-name=question4] input");
    await t
      .typeText(q1Input, "abc")
      .expect(q1Input.focused).ok()
      .pressKey("Enter")
      .expect(q1Input.focused).notOk()
      .typeText(q2Input, "it")
      .expect(q2Input.focused).ok()
      .pressKey("Enter")
      .expect(q2Input.focused).notOk();

    await ClientFunction(() => {
      window["Survey"].settings.enterKeyAction = "moveToNextEditor";
    })();

    await t
      .typeText(q1Input, "abc")
      .expect(q1Input.focused).ok()
      .pressKey("Enter")
      .typeText(q2Input, "it")
      .expect(q2Input.focused).ok()
      .pressKey("Enter")
      .expect(q3Input.focused).ok()
      .typeText(q3Input, "mnk")
      .pressKey("Enter")
      .expect(q3Input.focused).notOk();
    await ClientFunction(() => {
      window["Survey"].settings.enterKeyAction = "default";
    })();
  });

  test("enterKeyAction as property", async (t) => {
    const characterCounter = Selector(".sv-remaining-character-counter");

    await initSurvey(framework, {
      "logoPosition": "right",
      "pages": [
        {
          "name": "page1",
          "elements": [
            {
              "type": "text",
              "name": "question1"
            },
            {
              "type": "dropdown",
              "name": "question2",
              "choices": ["item1", "item2"]
            },
            {
              "type": "text",
              "name": "question3"
            }
          ]
        },
        {
          "name": "page2",
          "elements": [
            {
              "type": "text",
              "name": "question4"
            }
          ]
        }
      ]
    });

    await ClientFunction(() => {
      window["survey"].enterKeyAction = "loseFocus";
    })();

    const q1Input = Selector("div[data-name=question1] input");
    const q2Input = Selector("div[data-name=question2] input");
    const q3Input = Selector("div[data-name=question3] input");
    const q4Input = Selector("div[data-name=question4] input");
    await t
      .typeText(q1Input, "abc")
      .expect(q1Input.focused).ok()
      .pressKey("Enter")
      .expect(q1Input.focused).notOk()
      .typeText(q2Input, "it")
      .expect(q2Input.focused).ok()
      .pressKey("Enter")
      .expect(q2Input.focused).notOk();

    await ClientFunction(() => {
      window["survey"].enterKeyAction = "moveToNextEditor";
    })();

    await t
      .typeText(q1Input, "abc")
      .expect(q1Input.focused).ok()
      .pressKey("Enter")
      .typeText(q2Input, "it")
      .expect(q2Input.focused).ok()
      .pressKey("Enter")
      .expect(q3Input.focused).ok()
      .typeText(q3Input, "mnk")
      .pressKey("Enter")
      .expect(q3Input.focused).notOk();
    await ClientFunction(() => {
      window["survey"].enterKeyAction = "default";
    })();
  });
});
