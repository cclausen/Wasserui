<template>
    <b-card no-body>
        <b-card-header class="border-0">
            <h3 class="mb-0">Personen</h3>
        </b-card-header>

        <el-table class="table-responsive table"
                  header-row-class-name="thead-light"
                  :data="augmentedPersons">
            <el-table-column label="Project"
                             min-width="310px"
                             prop="name">
                <template v-slot="{row}">
                    <b-media no-body class="align-items-center">
                        <a href="#" class="avatar rounded-circle mr-3">
                            <img alt="Image placeholder" :src="row.img">
                        </a>
                        <b-media-body>
                            <span class="font-weight-600 name mb-0 text-sm">{{row.firstname + ' ' + row.lastname}}</span>
                        </b-media-body>
                    </b-media>
                </template>
            </el-table-column>

            <el-table-column label="Status"
                             min-width="170px"
                             prop="status">
                <template v-slot="{row}">
                    <badge class="badge-dot mr-4" type="">
                        <i :class="`bg-${row.statusType}`"></i>
                        <span class="status" :class="`text-${row.statusType}`">{{row.status}}</span>
                    </badge>
                </template>
            </el-table-column>
        </el-table>
    </b-card>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'light-table',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters([
      'person/getAllPersons'
    ]),
    augmentedPersons: function () {
      return this['person/getAllPersons'].map(p => {
        switch (p.status) {
          case 'ACTIVE':
            p.statusType = 'success'
            break
          case 'RETIRED':
            p.statusType = 'dark'
            break
          case 'ILL':
            p.statusType = 'danger'
            break
          case 'PRESENT':
            p.statusType = 'warning'
            break
          default:
            p.statusType = 'light'
        }
        return p
      })
    }
  },
  mounted () {
    this.$store.dispatch('person/getAllPersons')
  }
}
</script>
