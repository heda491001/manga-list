<template>
    <vxe-pager
        border
        size="medium"
        :loading="loading"
        :current-page="this.tablePage.currentPage"
        :page-size="this.tablePage.pageSize"
        :total="this.$parent.totalResult"
        :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
        @page-change="handlepage">
    </vxe-pager>
</template>

<script>

export default {

  name: 'pager',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    tablePage: {
      get () { return this.$parent.tablePage },
      set (val) { this.$parent.tablePage = val }
    }
  },
  created () {
    this.resetpage()
  },
  methods: {
    resetpage () {
      this.tablePage = {
        currentPage: 1,
        pageSize: 10
      }
    },
    handlepage ({ currentPage, pageSize }) {
      this.tablePage = { currentPage, pageSize }
    }
  }
}
</script>
