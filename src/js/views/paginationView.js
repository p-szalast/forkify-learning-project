import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto; //convert to string

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    //Page 1 and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton('next');

    //Last Page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupButton('prev');

    //Other Page
    if (curPage < numPages) {
      return [
        this._generateMarkupButton('prev'),
        this._generateMarkupButton('next'),
      ].join('');
    }

    return '';
  }

  _generateMarkupButton(side) {
    //next or prev
    const curPage = this._data.page;
    return `
          <button data-goto="${
            side === 'next' ? curPage + 1 : curPage - 1
          }" class="btn--inline pagination__btn--${side}">
          <span>Page ${side === 'next' ? curPage + 1 : curPage - 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-${
      side === 'next' ? 'right' : 'left'
    }"></use>
          </svg>
        </button>`;
  }
}

export default new PaginationView();
