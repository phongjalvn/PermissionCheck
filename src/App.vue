<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer
      fixed
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="menu in menus">
          <v-list-group
            v-if="menu.children"
            v-model="menu.active"
            :key="menu.text"
            :prepend-icon="menu.active ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ menu.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in menu.children"
              :key="i"
              @click=""
            >
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :key="menu.text">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ menu.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dark
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Permission</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        prepend-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
    </v-toolbar>
    <v-content>
      <v-data-table
            :headers="headers"
            :items="permissions"
            :pagination.sync="pagination"
            item-key="id"
            class="elevation-1"
          >
            <template slot="headers" slot-scope="props">
              <tr>
                <th
                  v-for="header in props.headers"
                  :key="header.text"
                  :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                  @click="changeSort(header.value)"
                >
                  <v-icon small>arrow_upward</v-icon>
                  {{ header.text }}
                </th>
              </tr>
            </template>
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.action }}</td>
                <td>{{ props.item.blState }}</td>
                <td>{{ props.item.transportState }}</td>
                <td>{{ props.item.role }}</td>
                <td class="text-xs-right">{{ props.item.expected }}</td>
                <td>{{ props.item.status }}</td>
              </tr>
            </template>
          </v-data-table>
    </v-content>
  </v-app>
</template>

<script>
  import * as defaultData from './const';
  import { blStates, transportStates } from './const';

  const allPermission = () => {
    let permissions = [];
    let id = 0;

    defaultData.getActions().forEach(action => {
      defaultData.transportStates.forEach(transportState => {
        defaultData.blStates.forEach(blState => {
          defaultData.roles.forEach(role => {
            let expected = false;
            
            // Chỉ Mod Hub A được tạo lộ trình khi trạng thái đơn hàng 'init'
            if (action.value ===0 && blState.value=='init' && role.value==='moda') expected=true;

            // Chỉ Mod Hub A được hủy lộ trình khi trạng thái đơn hàng là 'init' và trạng thái chuyển vận là 'confirmed'
            if (action.value ===1 && blState.value=='init' && role.value==='moda' && transportState.value==='confirmed') expected=true;

            permissions = [...permissions, {
              id,
              role: role.text,
              action: action.text,
              blState: blState.text,
              transportState: transportState.text,
              expected: expected ? 'Allow' : 'Not Allow',
              status: ''
            }];
            id++;
          });
        });
      });
    });
    return permissions;
  };

  const permissions = allPermission();
  // console.table(permissions)
  export default {
    data: () => ({
      drawer: null,
      roles: defaultData.roles,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Thao tác', value: 'action' },
        { text: 'Trạng thái đơn hàng', value: 'blState' },
        { text: 'Trạng thái chuyển vận', value: 'transportState' },
        { text: 'Roles', value: 'role' },
        { text: 'Expected', value: 'expected' },
        { text: 'Status', value: 'status' },
      ],
      pagination: {
        sortBy: 'id'
      },
      permissions: permissions,
      menus: [
        {
          text: "Status",
          children: defaultData.status
        },
        {
          text: "User Role",
          children: defaultData.roles
        },
        {
          text: "Thao tác",
          children: defaultData.getActions()
        },
        {
          text: "Trạng thái đơn hàng",
          children: defaultData.blStates
        },
        {
          text: "Trạng thái chuyển vận",
          children: defaultData.transportStates
        }
      ]
    }),
    props: {
      // menus: Array
    },
    methods: {
      changeSort (column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      }
    }
  }
</script>