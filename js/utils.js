const OPTIONS_IDS = ["grade", "month", "subject"];
const SELECTED_OPTIONS = "SELECTED_OPTIONS";

function saveSelectedOptions() {
    let selectedOptionsTexts = [];

    for (const id of OPTIONS_IDS) {
        const htmlSelect = document.getElementById(id);
        const selectedOptionText = htmlSelect.options[htmlSelect.selectedIndex].text.trim();
        selectedOptionsTexts.push(selectedOptionText);
    }

    sessionStorage.setItem(SELECTED_OPTIONS, selectedOptionsTexts.toString());
}

function goToPage(url) {
    window.location.href = url;
}

function getFilteredRecords() {
    let selectedOptionsNames = sessionStorage.getItem(SELECTED_OPTIONS);

    return RECORDS.filter(record => {
        return (selectedOptionsNames.includes(record.grade) &&
            selectedOptionsNames.includes(record.month) &&
            selectedOptionsNames.includes(record.subject))
    })
}

function appendLinks() {
    const htmlLinksWrapperDiv = document.getElementById("links");

    getFilteredRecords().forEach(record => {
        const htmlDiv = createHtmlElement("div", "", ["link"]);
        const htmlAnchor = createHtmlElement("a", record.topic, []);

        addAttributesToHtmlElement(htmlAnchor, [
            ["href", record.link],
            ["target", "_blank"],
        ]);

        htmlDiv.addEventListener("click", () => {
            window.open(record.link, '_blank').focus();
        });

        htmlDiv.appendChild(htmlAnchor);

        htmlLinksWrapperDiv.appendChild(htmlDiv);
    });
}

function createHtmlElement(name, text, classes) {
    const htmlElement = document.createElement(name);
    htmlElement.text = text;
    classes.forEach(className => htmlElement.classList.add(className));
    return htmlElement;
}

function addAttributesToHtmlElement(element, attributes) {
    attributes.forEach(attributesPair => {
        const attribute = attributesPair[0];
        const value = attributesPair[1];
        element[attribute] = value;
    });
}

function restorePreviousOptions() {
    let selectedOptionsNamesString = sessionStorage.getItem(SELECTED_OPTIONS);

    if (selectedOptionsNamesString) {
        let selectedOptionsNames = selectedOptionsNamesString.split(",");

        for (const id of OPTIONS_IDS) {
            const select = document.getElementById(id);
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === selectedOptionsNames[0]) {
                    select.options[i].selected = true;
                }
            }
            selectedOptionsNames.shift();
        }
    }
}
