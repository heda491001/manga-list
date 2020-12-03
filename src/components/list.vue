<template>
  <div id="list-view">
    <h1>list view</h1>
    <p>to show all records</p>
    <div>
      <vxe-toolbar>
        <template v-slot:buttons>
          <vxe-button icon="fa fa-refresh" @click="reloadList()"
            >reload</vxe-button
          >
          <vxe-button icon="fa fa-plus" @click="insertEvent()">add</vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-table
        border
        show-header-overflow2
        show-overflow
        highlight-hover-row
        :data="recordslist"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vxe-table-column
          field="title"
          sortable
          title="title"
          :filters="[{ data: '' }]"
          :filter-method="filterMethod"
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
          :filter-method="filterMethod"
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
          field="status"
          sortable
          title="status"
          :formatter="formatstatus"
        ></vxe-table-column>
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
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'font-awesome/css/font-awesome.css'
import editPopup from './editPopup.vue'

export default {
  name: 'list',
  components: { editPopup },
  data () {
    return {
      showEditflag: false,
      selectRow: null,
      formData: null
    }
  },

  computed: {
    showEdit: {
      get () { return this.showEditflag },
      set (val) { this.showEditflag = val }
    },
    ...mapState({
      recordslist: state => state.records.all
    })
  },
  created () {
    this.$store.dispatch('records/getAllRecords')
  },
  methods: {
    filterMethod ({ option, row }) {
      return String(row.title).startsWith(option.data)
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
    reloadList () {
      this.$store.dispatch('records/getAllRecords')
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
