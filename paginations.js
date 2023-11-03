
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
    const filterName = e.target.innerText;
    if (!filterName.length) return;
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
    counter.text(currentPage + "/" + Math.ceil(articles.length / itemsPerPage));
}

function scrollToTopArticles() {
    // $("html, body").animate({
    //     scrollTop: $(".article-cols").offset().top
    // }, 1000);
}


console.log("articles -> ", articles);
