<template>
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
</template>

<script>

export default {
  name: 'editPopup',
  props: ['selectRow', 'formData'],
  computed: {
    showEdit: {
      get () { return this.$parent.showEdit },
      set (val) { this.$parent.showEdit = val }
    }
  },
  data () {
    return {
      submitLoading: false,
      formRules: {
        title: [{ required: true, message: 'please enter the book title' }],
        author: [{ required: true, message: 'please enter the author' }]
      },
      formItems: [
        {
          title: 'book information',
          span: 24,
          titleAlign: 'left',
          titleWidth: 200,
          titlePrefix: { icon: 'fa fa-address-card-o' }
        },
        {
          field: 'title',
          title: 'title',
          span: 12,
          itemRender: {
            name: '$input',
            props: { placeholder: 'please enter the book title' }
          }
        },
        {
          field: 'author',
          title: 'author',
          span: 12,
          itemRender: {
            name: '$input',
            props: { placeholder: 'please enter the author' }
          }
        },
        {
          field: 'status',
          title: 'status',
          span: 12,
          itemRender: {
            name: '$select',
            options: [
              { label: '未購入', value: '1' },
              { label: '本を購入済み', value: '2' },
              { label: 'kindleを購入済み', value: '3' }
            ]
          }
        },
        {
          align: 'center',
          span: 24,
          titleAlign: 'left',
          itemRender: {
            name: '$buttons',
            children: [
              {
                props: { type: 'submit', content: 'submit', status: 'primary' }
              },
              { props: { type: 'reset', content: 'reset' } }
            ]
          }
        }
      ]
    }
  },
  methods: {
    submitEvent () {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          // 临时使用insert的api，如果同样的数据应该会覆盖
          this.$store.dispatch('records/putRecords', this.formData)
          this.$XModal.message({ message: 'edit success', status: 'success' })
        } else {
          this.$store.dispatch('records/putRecords', this.formData)
          this.$XModal.message({ message: 'add success', status: 'success' })
        }
      }, 500)
    }
  }
}
</script>
