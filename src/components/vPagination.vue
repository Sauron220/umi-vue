<template>
  <nav aria-label="Page navigation" class="text-center">
    <ul class="pagination" v-if="withOutPageAtUrl">
      <li :class="{'disabled':currentPage == 1}">
        <a :href="(currentPage*1)>1?withOutPageAtUrl+(currentPage*1-1):'javascript:;'" aria-label="Previous">
          <span aria-hidden="true">&laquo;&nbsp;上壹頁</span>
        </a>
      </li>
      <li :class="{'active':currentPage == 1}"><a :href="withOutPageAtUrl+1">1</a></li>
      <li v-if="currentPage>4 && totalPage>4"><span>…</span></li>
      <li v-for="item in containPage" :class="{'active':currentPage == item}">
        <a :href="withOutPageAtUrl+item">{{item}}</a>
      </li>
      <li v-if="currentPage<(totalPage-3) && totalPage>=5"><span>…</span></li>
      <li :class="{'active':currentPage == totalPage}"><a :href="withOutPageAtUrl+totalPage" v-if="totalPage>1">{{totalPage}}</a>
      </li>
      <li :class="{'disabled':currentPage == totalPage}">
        <a :href="(currentPage*1)<totalPage?withOutPageAtUrl+(currentPage*1+1):'javascript:;'"
           aria-label="Next">
          <span aria-hidden="true">下壹頁&nbsp;&raquo;</span>
        </a>
      </li>
    </ul>
    <ul class="pagination" v-if="!withOutPageAtUrl">
      <li :class="{'disabled':currentPage == 1}">
        <a href="javascript:;" @click="(currentPage*1)>1?goPage(currentPage*1-1):''" aria-label="Previous">
          <span aria-hidden="true">&laquo;&nbsp;上壹頁</span>
        </a>
      </li>
      <li :class="{'active':currentPage == 1}"><a @click="goPage(1)">1</a></li>
      <li v-if="currentPage>4 && totalPage>4"><span>…</span></li>
      <li v-for="item in containPage" :class="{'active':currentPage == item}">
        <a href="javascript:;" @click="goPage(item)">{{item}}</a>
      </li>
      <li v-if="currentPage<(totalPage-3) && totalPage>=5"><span>…</span></li>
      <li :class="{'active':currentPage == totalPage}"><a href="javascript:;" @click="goPage(totalPage)"
                                                          v-if="totalPage>1">{{totalPage}}</a></li>
      <li :class="{'disabled':currentPage == totalPage}">
        <a href="javascript:;"
           @click="(currentPage*1)<totalPage?goPage(currentPage*1+1):'javascript:;'" aria-label="Next">
          <span aria-hidden="true">下壹頁&nbsp;&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
  export default {
    name: 'vPagination',
    data(){
      return {
        containPage: []
      }
    },
    props: {
      totalPage: null,
      currentPage: null,
      onPageClick: null,
      withOutPageAtUrl: null,
      pageFor: null,
      pageForArg: null
    },
    created: function () {
      var self = this;
      setTimeout(function () {
        self.setPre(self.currentPage * 1 - 2, self.totalPage, self.containPage);
        self.setPre(self.currentPage * 1 - 1, self.totalPage, self.containPage);
        self.setPre(self.currentPage * 1, self.totalPage, self.containPage);
        self.setNext(self.currentPage * 1 + 1, self.totalPage, self.containPage);
        self.setNext(self.currentPage * 1 + 2, self.totalPage, self.containPage);
      });
    },
    methods: {
      setPre(item, totalPage, arr){
        if (item > 1 && item < totalPage) {
          arr.push(item);
        }
      },
      setNext(item, totalPage, arr){
        if (item < totalPage) {
          arr.push(item);
        }
      },
      goPage(index){
        this.pageForArg.index = index;
        this.pageFor(this.pageForArg)
      }
    }
  }
</script>
