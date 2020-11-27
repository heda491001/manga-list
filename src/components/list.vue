<template>
  <div id="list-view">
    <h1>list view</h1>
    <p>to show all records</p>
    <div>
      <vxe-toolbar>
        <template v-slot:buttons>
          <vxe-button @click="reloadList()">reload</vxe-button>
          <vxe-button icon="plus" @click="insertEvent()">add</vxe-button>
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
        ></vxe-table-column>
        <vxe-table-column
          field="updatetime"
          sortable
          title="updatetime"
        ></vxe-table-column>
        <vxe-table-column title="操作" width="100" show-overflow>
          <template slot-scope="{ row }">
            <vxe-button @click="editEvent(row)">edit</vxe-button>
            <vxe-button @click="removeEvent(row)">del</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <vxe-modal
        v-model="showEdit"
        :title="selectRow ? 'edit&save' : 'new&save'"
        width="800"
        min-width="600"
        min-height="300"
        :loading="submitLoading"
        resize
        destroy-on-close
      >
        <template v-slot>
          <vxe-form
            :data="formData"
            :items="formItems"
            :rules="formRules"
            title-align="right"
            title-width="100"
            @submit="submitEvent"
          ></vxe-form>
        </template>
      </vxe-modal>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import XEUtils from "xe-utils";

export default {
  name: "list",
  data() {
    return {
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      formData: null,
      formRules: {
        title: [{ required: true, message: "please enter the book title" }],
        author: [{ required: true, message: "please enter the author" }],
      },
      formItems: [
        {
          title: "book information",
          span: 24,
          titleAlign: "left",
          titleWidth: 200,
          titlePrefix: { icon: "fa fa-address-card-o" },
        },
        {
          field: "title",
          title: "title",
          span: 12,
          itemRender: {
            name: "$input",
            props: { placeholder: "please enter the book title" },
          },
        },
        {
          field: "author",
          title: "author",
          span: 12,
          itemRender: {
            name: "$input",
            props: { placeholder: "please enter the author" },
          },
        },
        {
          field: "status",
          title: "status",
          span: 12,
          itemRender: {
            name: "$select",
            options: [
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" },
              { label: "5", value: "5" },
            ],
          },
        },
        {
          align: "center",
          span: 24,
          titleAlign: "left",
          itemRender: {
            name: "$buttons",
            children: [
              {
                props: { type: "submit", content: "submit", status: "primary" },
              },
              { props: { type: "reset", content: "reset" } },
            ],
          },
        },
      ],
    };
  },
  computed: mapState({
    recordslist: (state) => state.records.all,
  }),
  created() {
    this.$store.dispatch("records/getAllRecords");
  },
  methods: {
    filterMethod({ option, row }) {
      return String(row.title).startsWith(option.data);
    },
    formatDate({ cellValue }) {
      return { cellValue };
      // return XEUtils.toDateString(cellValue, "yyyy-MM-dd HH:mm:ss");
    },
    reloadList() {
      this.$store.dispatch("records/getAllRecords");
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row);
    },
    insertEvent() {
      this.formData = {
        title: "",
        author: "",
        status: "",
        updatetime: "",
      };
      this.selectRow = null;
      this.showEdit = true;
    },
    editEvent(row) {
      this.formData = {
        title: row.title,
        author: row.author,
        status: row.status,
        updatetime: row.updatetime,
      };
      this.selectRow = row;
      this.showEdit = true;
    },
    submitEvent() {
      this.submitLoading = true;
      setTimeout(() => {
        this.submitLoading = false;
        this.showEdit = false;
        if (this.selectRow) {
          this.$XMassignodal.message({
            message: "edit success",
            status: "success",
          });
          Object.assign(this.selectRow, this.formData);
        } else {
          this.$XModal.message({ message: "add success", status: "success" });
          this.$store.dispatch("records/putRecords", this.formData);
        }
      }, 500);
    },
  },
};
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
