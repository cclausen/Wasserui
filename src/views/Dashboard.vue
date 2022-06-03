<template>
  <div>

    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-primary">
    <!-- Card stats -->
      <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total hours"
                      type="gradient-green"
                      sub-title="350,897"
                      icon="fas fa-hourglass-end"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total persons"
                      type="gradient-blue"
                      sub-title="2,356"
                      icon="fas fa-swimmer"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Rescues"
                      type="gradient-red"
                      sub-title="924"
                      icon="far fa-life-ring"
                      class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="First Aid"
                      type="gradient-orange"
                      sub-title="49,65"
                      icon="fas fa-medkit"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row>
    </base-header>

    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <b-card
            title="Anwesend">
            <b-card-text>
              <span v-if="presentPersons.length === 0">Niemand anwesend</span>
              <ul>
                <li v-for="person in presentPersons" :key="person.id">
                  {{ person.firstname + ' ' + person.lastname }}
                </li>
              </ul>
              <base-button v-b-modal.arrivalModal block type="success"><i class="fas fa-user-plus" aria-hidden="true"/>
                Retter angekommen
              </base-button>
              <b-modal id="arrivalModal" title="Welcher Retter ist angekommen?">
                <span v-if="notPresentPersons.length === 0">Kein verfügbarer Retter gefunden</span>
                <base-button block type="success" v-for="person in notPresentPersons" :key="person.id"
                             @click="startPresence(person)">
                      <span class="btn-inner--icon"><i class="fas fa-plus" aria-hidden="true"/>
                        {{ person.firstname + ' ' + person.lastname }}
                      </span>
                </base-button>
              </b-modal>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            title="Einsätze">
            <b-card-text>
              <span v-if="operations.length === 0">Noch keine Einsätze</span>
              <ul>
                <li v-for="operation in operations" :key="operation.id">
                  {{ operation.name }}
                </li>
              </ul>
              <base-button v-b-modal.operationModal block type="primary">
                <i class="fas fa-first-aid" aria-hidden="true"/>
                Einsatz eintragen
              </base-button>
              <b-modal id="operationModal" title="New message to undefined">
                <p class="my-4">...</p>
              </b-modal>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                    class="mr-2 mr-md-0"
                    :active="bigLineChart.activeIndex === 0"
                    link-classes="py-2 px-3"
                    @click.prevent="initBigChart(0)">
                    <span class="d-none d-md-block">Month</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                    link-classes="py-2 px-3"
                    :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)"
                  >
                    <span class="d-none d-md-block">Week</span>
                    <span class="d-md-none">W</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->
    </b-container>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from '@/components/Charts/config'
import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'

// Components
import BaseProgress from '@/components/BaseProgress'
import StatsCard from '@/components/Cards/StatsCard'
import { mapGetters } from 'vuex'


export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard
  },
  data () {
    return {
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60, 80, 90, 110]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: 'Performance',
              data: [0, 20, 10, 30, 15, 40, 20, 60, 60]
            }
          ],
          labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        extraOptions: chartConfigs.blueChartOptions
      },
      operations: []
    }
  },
  computed: {
    ...mapGetters([
      'person/getAllPersons'
    ]),
    presentPersons: function () {
      return this['person/getAllPersons'].filter(p => p.presence)
    },
    notPresentPersons: function () {
      return this['person/getAllPersons'].filter(p => p.status !== 'ILL' && p.status !== 'RETIRED')
    }
  },
  methods: {
    initBigChart (index) {
      this.bigLineChart.chartData = {
        datasets: [
          {
            label: 'Performance',
            data: this.bigLineChart.allData[index]
          }
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
      this.bigLineChart.activeIndex = index
    },
    startPresence (person) {
      this.$store.dispatch('presence/start', { personId: person.id, placeId: 1 })
    }
  },
  mounted() {
    this.$store.dispatch('person/getAllPersons')
    this.initBigChart(0)
  }
};
</script>
