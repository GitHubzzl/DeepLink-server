class Page {
  // 构造
  constructor(webPageName) {
    this.name = webPageName;
    this.currentPage = 1;
    this.pageSize = 10;
    this.total = 0;
    this.list = [];
    this.listDescription = "";
  }

  getName() {
    return (this.name);
  }

  setCurrentPage(currentPage) {
    this.name = currentPage;
  }

  setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  setTotal(total) {
    this.total = total;
  }

  setList(list) {
    this.list = list;
  }

  setListDescription(listDescription) {
    this.listDescription = listDescription;
  }
}

module.exports = Page;
