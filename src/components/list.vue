<template>
  <div id="list-view">
    <h1>list view</h1>
    <p>to show all records</p>
    <div>
      <vxe-toolbar
        custom
        import
        export
        :refresh="{query:reloadList,icon:'fa fa-refresh'}">
        <template v-slot:buttons>
          <vxe-button icon="fa fa-plus" @click="insertEvent()">add</vxe-button>
          <vxe-button icon="fa fa-search" @click="search()">search</vxe-button>
          <vxe-input v-model="searchKeyword.title" placeholder="title"></vxe-input>
          <vxe-input v-model="searchKeyword.author" placeholder="author"></vxe-input>
        </template>
      </vxe-toolbar>
      <vxe-table
        resizable
        border
        show-header-overflow2
        show-overflow
        highlight-hover-row
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent"
        :scroll-x="{enabled: false}"
        :scroll-y="{enabled: false}"
      >
        <vxe-table-column
          field="title"
          sortable
          title="title"
          :filters="[{ data: '' }]"
          :filter-method="filterTitleMethod"
        >
          <template v-slot:filter="{ $panel, column }">
            <input
              type="type"
              v-for="(option, index) in column.filters"
              :key="index"
              v-model="option.data"
              @input="$panel.changeOption($event, !!option.data, option)"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="author"
          sortable
          title="author"
          :filters="[{ data: '' }]"
          :filter-method="filterAuthorMethod"
        >
          <template v-slot:filter="{ $panel, column }">
            <input
              type="type"
              v-for="(option, index) in column.filters"
              :key="index"
              v-model="option.data"
              @input="$panel.changeOption($event, !!option.data, option)"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column
          title="cover"
        >
          <template v-slot>
            <img src="https://private-image-hosting.s3-ap-northeast-1.amazonaws.com/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20210106105019.jpg" style="width: 100px;">
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="status"
          sortable
          title="status"
          :filter-multiple="false"
          :filters="[{label: '未購入', value: '1'}, {label: '本を購入済み', value: '2'},{label: 'kindleを購入済み', value: '3'}]"
          :formatter="formatstatus"
        >
        </vxe-table-column>
        <vxe-table-column
          field="updatetime"
          sortable
          title="updatetime"
        ></vxe-table-column>
        <vxe-table-column title="操作" width="100" show-overflow>
          <template slot-scope="{ row }">
            <vxe-button
              type="text"
              icon="fa fa-edit"
              @click="editEvent(row)"
            ></vxe-button>
            <vxe-button
              type="text"
              icon="fa fa-trash-o"
              @click="removeEvent(row)"
            ></vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <editPopup :selectRow=selectRow :formData=formData></editPopup>
      <pager ref="pager1"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'font-awesome/css/font-awesome.css'
import editPopup from './editPopup.vue'
import pager from './pager.vue'

export default {
  name: 'list',
  components: {
    editPopup,
    pager
  },
  data () {
    return {
      showEditflag: false,
      selectRow: null,
      formData: null,
      PageData: {
        currentPage: 1,
        pageSize: 10
      },
      searchKeyword: {
        title: '',
        author: ''
      }
    }
  },

  computed: {
    showEdit: {
      get () { return this.showEditflag },
      set (val) { this.showEditflag = val }
    },
    tablePage: {
      get () { return this.PageData },
      set (val) { this.PageData = val }
    },
    from () {
      return this.tablePage.pageSize * (this.tablePage.currentPage - 1)
    },
    to () {
      return this.tablePage.pageSize * this.tablePage.currentPage
    },
    ...mapState({
      recordslist: state => state.records.all,
      tableData (state) {
        return state.records.all.slice(this.from, this.to)
      },
      totalResult (state) {
        return state.records.all.length
      }
    })
  },
  created () {
    this.$store.dispatch('records/getAllRecords', this.searchKeyword)
  },
  methods: {
    filterTitleMethod ({ option, row }) {
      return (String(row.title).indexOf(option.data) !== -1)
    },
    filterAuthorMethod ({ option, row }) {
      return (String(row.author).indexOf(option.data) !== -1)
    },
    formatstatus ({ cellValue }) {
      const flag = parseInt(cellValue)
      switch (flag) {
        case 1:
          return '未購入'
        case 2:
          return '本を購入済み'
        case 3:
          return 'kindleを購入済み'
        default:
          return 'undefeat'
      }
    },
    search () {
      this.$store.dispatch('records/getAllRecords', this.searchKeyword)
    },
    reloadList () {
      this.searchKeyword = {
        title: '',
        author: ''
      }
      this.$store.dispatch('records/getAllRecords', this.searchKeyword)
    },
    cellDBLClickEvent ({ row }) {
      this.editEvent(row)
    },
    insertEvent () {
      this.formData = {
        title: '',
        author: '',
        status: '',
        updatetime: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent (row) {
      this.formData = {
        title: row.title,
        author: row.author,
        status: row.status,
        updatetime: row.updatetime
      }
      this.selectRow = row
      this.showEdit = true
    },
    removeEvent (row) {
      this.$XModal.confirm('您确定要删除「' + row.title.toString() + '」 ?').then((type) => {
        if (type === 'confirm') {
          this.$store.dispatch('records/removeRecord', row)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  margin: 0 50px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#list-view {
  margin: 20px;
}
</style>
