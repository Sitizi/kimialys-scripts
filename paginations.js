
const articlesSelector = ".article-cols > div";
let articles = $(articlesSelector);
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const clearBtn = $(".btn-filter-clear-paragraph");
const counter = $(".pagination-counter");
const itemsPerPage = 4;
let currentPage = 1;
const btnsFilter = $(".btn-filter-blog");

updateCounter();
articles.hide();
articles.slice(0, itemsPerPage).fadeIn();

const numberOfPages = Math.ceil(articles.length / itemsPerPage);

prevBtn.on("click", () => {
    if (currentPage > 1) {
        currentPage--;
        articles.hide();
        articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).fadeIn();
        updateCounter();
        scrollToTopArticles();
    }
});

nextBtn.on("click", () => {

    if (currentPage < Math.ceil(articles.length / itemsPerPage)) {
        currentPage++;
        articles.hide();
        articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).fadeIn();
        updateCounter()
        scrollToTopArticles();
    }
});

btnsFilter.on("click", (e) => {
    // get value of attribute data-filter
    const filterName = e.target.getAttribute("data-filter");
    if (!filterName || !filterName.length) return;
    articles.hide();
    articles = $(articlesSelector).filter(`[data-filter="${filterName}"]`);
    // show with fade effect
    articles.slice(0, itemsPerPage).fadeIn();
    currentPage = 1;
    updateCounter();
});

clearBtn.on("click", () => {
    articles.hide();
    articles = $(articlesSelector);
    // uncheck all radio buttons
    $("input[type=radio]").prop("checked", false);
    articles.slice(0, itemsPerPage).fadeIn();
    updateCounter();
});

function updateCounter() {
    const maxPages = Math.ceil(articles.length / itemsPerPage);
    // clean pagination
    counter.empty();
    for (let i = 0; i < maxPages; i++) {
        // add button to pagination
        if ($(`.btn-page-${i + 1}`).length === 0) {
            const btn = $(`<button class="btn-page btn-page-${i + 1} ${currentPage === i + 1 ? "active" : ""}">${i + 1}</button>`);

            counter.append(btn);

            btn.on("click", () => {
                currentPage = i + 1;
                articles.hide();
                articles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).fadeIn();
                updateCounter();
                scrollToTopArticles();
            });
        }
    }
}

function scrollToTopArticles() {
    // $("html, body").animate({
    //     scrollTop: $(".article-cols").offset().top
    // }, 1000);
}
