import { Selector, ClientFunction } from "testcafe";
import { url, frameworks, initSurvey, url_test, explicitErrorHandler, wrapVisualTest, takeElementScreenshot } from "../../helper";

const title = "Paneldynamic Screenshot";

fixture`${title}`.page`${url}`.beforeEach(async (t) => {

});

const applyTheme = ClientFunction(theme => {
  (<any>window).Survey.StylesManager.applyTheme(theme);
});
var json = {
  showQuestionNumbers: "off",
  questions: [
    {
      type: "paneldynamic",
      name: "applications",
      title: "What application do you use?",
      renderMode: "progressTop",
      templateTitle: "{panel.application}",
      templateElements: [
        {
          name: "application",
          type: "dropdown",
          title: "Application",
          defaultValue: "Adobe Photoshop",
          choices: [
            "Adobe Photoshop",
          ],
        },
        {
          name: "often",
          type: "radiogroup",
          title: "How often do you use this applications?",
          choices: ["Rare", "Sometimes", "Always"]
        }
      ],
      panelCount: 2,
      noEntriesText: "You can add as many applications as you want.\nJust click the button below to start.",
      panelAddText: "Add application",
      panelRemoveText: "Remove application",
      width: "768px"
    },
  ]
};

const theme = "defaultV2";

frameworks.forEach(framework => {
  fixture`${framework} ${title} ${theme}`
    .page`${url_test}${theme}/${framework}`.beforeEach(async t => {
    await explicitErrorHandler();
    await applyTheme(theme);
    await initSurvey(framework, json);
  });
  test("Paneldynamic progressTop mode", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {

      await t.resizeWindow(1920, 1080);
      const paneldynamicRoot = Selector(".sd-question--paneldynamic");
      await ClientFunction(() => {
        (window as any).survey.getQuestionByName("applications").currentIndex = 2;
      })();
      await takeElementScreenshot("paneldynamic-progress-top.png", paneldynamicRoot, t, comparer);
      await ClientFunction(() => {
        (window as any).survey.getAllQuestions()[0].allowRemovePanel = false;
      })();
      await takeElementScreenshot("paneldynamic-without-remove-button.png", paneldynamicRoot, t, comparer);
      await ClientFunction(() => {
        (window as any).survey.getAllQuestions()[0].allowRemovePanel = true;
        (window as any).survey.getQuestionByName("applications").legacyNavigation = true;
      })();
      await takeElementScreenshot("paneldynamic-progress-top-legacy-navigation.png", paneldynamicRoot, t, comparer);
      await ClientFunction(() => { (window as any).survey.getQuestionByName("applications").panelCount = 0; })();
      await takeElementScreenshot("paneldynamic-empty.png", paneldynamicRoot, t, comparer);
    });
  });
  test("Paneldynamic list mode", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {

      await t.resizeWindow(1920, 1920);
      const paneldynamicRoot = Selector(".sd-question--paneldynamic");
      await ClientFunction(() => {
        document.body.focus();
        (window as any).survey.getQuestionByName("applications").renderMode = "list";
      })();
      await takeElementScreenshot("paneldynamic-list.png", paneldynamicRoot, t, comparer);
    });
  });
});

frameworks.forEach(framework => {
  fixture`${framework} ${title} ${theme}`
    .page`${url_test}${theme}/${framework}`.beforeEach(async t => {
    await explicitErrorHandler();
    await applyTheme(theme);
    await initSurvey(framework, json, {
      onGetPanelFooterActions: (_, opt) => {
        opt.actions.push({
          title: "Duplicate",
          action: () => {}
        });
      }
    });
  });
  test("Check paneldynamic with custom actions", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      const paneldynamicRoot = Selector(".sd-question--paneldynamic");
      await ClientFunction(() => {
        document.body.focus();
      })();
      await takeElementScreenshot("paneldynamic-with-custom-actions.png", paneldynamicRoot, t, comparer);
    });
  });
});

frameworks.forEach(framework => {
  const json = {
    elements: [
      {
        type: "panel",
        title: "Panel",
        elements: [
          {
            type: "paneldynamic",
            name: "nested_paneldynamic",
            title: "Paneldynamic",
            panelCount: 1,
            templateElements: [{
              name: "q2",
              title: "Text question",
              type: "text"
            }]
          },
          {
            type: "paneldynamic",
            name: "nested_paneldynamic2",
            title: "Paneldynamic",
            startWithNewLine: false,
            panelCount: 1,
            templateElements: [{
              name: "q2",
              title: "Text question",
              type: "text"
            }]
          }
        ]
      }
    ]
  };
  fixture`${framework} ${title} ${theme}`
    .page`${url_test}${theme}/${framework}`.beforeEach(async t => {
    await explicitErrorHandler();
    await applyTheme(theme);
    await initSurvey(framework, json);
  });
  test("Two Paneldynamics in one row", async (t)=>{
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1920);
      await ClientFunction(() => {
        document.body.focus();
      })();
      await takeElementScreenshot("two-paneldynamic-in-one-row", Selector(".sd-panel"), t, comparer);
    });
  });
});

frameworks.forEach(framework => {
  const json = {
    "logoPosition": "right",
    "pages": [
      {
        "name": "page1",
        "elements": [
          {
            type: "paneldynamic",
            name: "relatives",
            title: "Panel Dynamic",
            renderMode: "tab",
            templateTitle: "Information about: {panel.relativeType}",
            templateElements: [
              {
                name: "relativeType",
                type: "dropdown",
                title: "Relative",
                choices: [
                  "father",
                  "mother",
                  "brother",
                  "sister",
                  "son",
                  "daughter"
                ],
                isRequired: true
              },
              {
                name: "isalive",
                type: "radiogroup",
                title: "Alive?",
                startWithNewLine: false,
                isRequired: true,
                colCount: 0,
                choices: ["Yes", "No"]
              },
              {
                name: "liveage",
                type: "dropdown",
                title: "Age",
                isRequired: true,
                startWithNewLine: false,
                visibleIf: "{panel.isalive} = 'Yes'",
                choicesMin: 1,
                choicesMax: 115
              },
              {
                name: "deceasedage",
                type: "dropdown",
                title: "Deceased Age",
                isRequired: true,
                startWithNewLine: false,
                visibleIf: "{panel.isalive} = 'No'",
                choices: [
                  {
                    value: -1,
                    text: "Unknown"
                  }
                ],
                choicesMin: 1,
                choicesMax: 115
              },
              {
                name: "causeofdeathknown",
                type: "radiogroup",
                title: "Cause of Death Known?",
                isRequired: true,
                colCount: 0,
                startWithNewLine: false,
                visibleIf: "{panel.isalive} = 'No'",
                choices: ["Yes", "No"]
              },
              {
                name: "causeofdeath",
                type: "text",
                title: "Cause of Death",
                isRequired: true,
                startWithNewLine: false,
                visibleIf:
                "{panel.isalive} = 'No' and {panel.causeofdeathknown} = 'Yes'"
              }
            ],
            panelCount: 2,
            panelAddText: "Add a blood relative",
            panelRemoveText: "Remove the relative"
          }
        ]
      }
    ]
  };
  fixture`${framework} ${title} ${theme}`
    .page`${url_test}${theme}/${framework}`.beforeEach(async t => {
    await explicitErrorHandler();
    await applyTheme(theme);
    await initSurvey(framework, json);
  });
  test("Navigation panel by tabs", async (t)=>{
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1280, 900);
      await ClientFunction(() => {
        document.body.focus();
      })();
      await takeElementScreenshot("paneldynamic-tabs-with-title", Selector(".sd-question--paneldynamic"), t, comparer);
      await t.hover(Selector(".sd-tab-item").withText("Panel 2"));
      await takeElementScreenshot("paneldynamic-tabs-hover-tab", Selector(".sd-question--paneldynamic"), t, comparer);
      await ClientFunction(() => {
        (<any>window).survey.getQuestionByName("relatives").titleLocation = "hidden";
      })();

      await takeElementScreenshot("paneldynamic-tabs-without-title", Selector(".sd-question--paneldynamic"), t, comparer);
      await ClientFunction(() => {
        (<any>window).survey.getQuestionByName("relatives").panelCount = 15;
      })();
      await takeElementScreenshot("paneldynamic-tabs-responsiveness", Selector(".sd-question--paneldynamic"), t, comparer);
      await t.hover(".sv-dots");
      await takeElementScreenshot("paneldynamic-tabs-responsiveness-hover", Selector(".sd-question--paneldynamic"), t, comparer);
    });
  });
});
