---
---


// Set variables
const faq_filters = document.querySelectorAll('[data-filter-type="filter"]');
const faq_guide_1_content = document.querySelector('[data-faq-content="guide1"]');
const faq_guide_2_content = document.querySelector('[data-faq-content="guide2"]');
const faq_guide_3_content = document.querySelector('[data-faq-content="guide3"]');
const faq_guide_4_content = document.querySelector('[data-faq-content="guide4"]');

// Function to create accordion element
function faq_create_accordion_element(id, questionContent, answerContent, footnotes) {

    // Create an id for use when implementing functionality for accordions
    var string = 'faq' + id;

    // Create accordion item
    var accordion_item = document.createElement('div');
    accordion_item.className = 'accordion-item is-visible';
    accordion_item.setAttribute("data-filter-type", "filter-item");

    // Create accordion heading
    var accordion_header = document.createElement('h2');
    accordion_header.className = 'accordion-header';
    accordion_header.id = "accordionHeading" + id;
    accordion_item.append(accordion_header);

    // Create accordion button
    var accordion_button = document.createElement('button');
    accordion_button.className = 'accordion-button collapsed';

    accordion_button.setAttribute("data-bs-toggle", "collapse")
    accordion_button.setAttribute("type", "button")
    accordion_button.setAttribute("data-bs-target", "#" + string);
    accordion_button.setAttribute("aria-controls", +string);
    accordion_button.setAttribute("aria-expanded", "false")
    accordion_button.innerHTML = questionContent;
    accordion_header.append(accordion_button);

    // Create accordion
    var accordion_content = document.createElement('div');
    accordion_content.className = "accordion-collapse collapse";
    accordion_content.id = string;
    accordion_content.setAttribute("aria-labeledby", "accordionHeading" + id);
    // accordion_content.setAttribute("data-bs-parent", "#accordionExample");
    accordion_item.append(accordion_content);

    //Create accordion body
    var accordion_body = document.createElement('div');
    accordion_body.className = "accordion-body";
    accordion_body.innerHTML = answerContent;
    accordion_content.append(accordion_body);

    //Create accordion footnotes
    if(footnotes != ''){
        var accordion_footnote = document.createElement('span');
        accordion_footnote.className = "accordion-footnote";
        accordion_footnote.innerHTML = footnotes;
        accordion_body.append(accordion_footnote);
    }

    return accordion_item;
}

// Function to load JSON data into accordions
function faq_populate_accordion_data(array){
    array.forEach(item => {
        var id = item["ID"];
        let question = item["question"];
        let answer = item["answer"];
        let footnotes = item["footnotes"];
        const is_program_sponsors = item["program sponsors"];
        const is_program_hosts = item["program hosts"];
        const is_program_participants = item["participants"];
        var accordion = faq_create_accordion_element(id, question, answer, footnotes);

        if (is_program_sponsors == "TRUE") {
            accordion.setAttribute("data-filter-tag-program-sponsors", "true")
        }

        if (is_program_hosts == "TRUE") {
            accordion.setAttribute("data-filter-tag-program-hosts", "true")
        }

        if (is_program_participants == "TRUE") {
            accordion.setAttribute("data-filter-tag-program-participants", "true")
        }

        if (item["guide1"] == "TRUE") {
            faq_guide_1_content.append(accordion)
        }

        if (item["guide2"] == "TRUE") {
            faq_guide_2_content.append(accordion)
        }

        if (item["guide3"] == "TRUE") {
            faq_guide_3_content.append(accordion)
        }

        if (item["guide4"] == "TRUE") {
            faq_guide_4_content.append(accordion)
        }
    });
}
faq_populate_accordion_data(faq_array)

// Function to filter items on click
function faq_filter_on_click() {

    // Set variables
    const filter_items = document.querySelectorAll('[data-filter-type="filter-item"]');

    // Loop through each filter button
    faq_filters.forEach(el => {
        // On click
        el.addEventListener('click', function () {
            // Prevent default link behavior
            event.preventDefault();

            if(el.attributes["data-filter-selected"].value != "true"){

                faq_filters.forEach(element => {
                    if(element.attributes["data-filter-selected"].value == "true"){
                        element.setAttribute("data-filter-selected", "false");
                    }
                })

                el.setAttribute("data-filter-selected", "true");

                // Add selected class
                add_classes_to_filter_buttons(el);

                // Save the value of data-filter-target attribute into variable
                const filter_category = el.attributes['data-filter-target'].value;

                if(filter_category == 'all'){
                    filter_items.forEach(item => {
                        show(item)
                    });
                } else {
                // Loop through each question
                filter_items.forEach(item => {
                    if (item.attributes[filter_category] != undefined) {
                        if (item.attributes[filter_category].value == "true") {
                            show(item);
                        }
                    } else {
                        hide(item);
                    }
                })
                }
            }
        });
    })
}
faq_filter_on_click();

// Function to add selected class to buttons when clicked and remove them from others
function add_classes_to_filter_buttons(el){
    faq_filters.forEach(button => {
                // Add selected class
                if(button.classList.contains("selected")){
                    button.classList.remove('selected');
                }

                // Add selected class
                if(!el.classList.contains("selected")){
                    el.classList.add('selected');
                }
            });
}


// Miscellaneous functions to show/hide elements

// Show an element
var show = function (elem) {

    var getHeight = function () {
        elem.style.display = 'block';

        var height = elem.scrollHeight + 'px';

        elem.style.display = '';

        return height;
    }

    var height = getHeight();
    elem.classList.add('is-visible');
    elem.style.height = height;

    window.setTimeout(function () {
        elem.style.height = '';
    }, 350);
}

//Hide an element
var hide = function (elem) {
    elem.style.height = elem.scrollHeight + 'px';

    window.setTimeout(function () {
        elem.style.height = '0';
    }, 1)

    window.setTimeout(function () {
        elem.classList.remove('is-visible');
    }, 350);
}

// Toogle element visibility
var toggle = function (elem, timing) {
    if (elem.classList.contains('is-visible')) {
        hide(elem);
        return;
    }

    show(elem);
}

