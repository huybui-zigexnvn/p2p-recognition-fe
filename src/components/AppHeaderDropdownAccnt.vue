<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        {{ $t('header.settings') }}
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> {{ $t('header.settings') }} </CDropdownItem>
      <CDropdownItem> <CIcon icon="cil-settings" /> {{ $t('header.profile') }} </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout"> <CIcon icon="cil-lock-locked" /> {{ $t('header.logout') }} </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import avatar from '@/assets/logo.png'
export default {
  name: 'AppHeaderDropdownAccnt',
  methods: {
    logout() {
      window.localStorage.setItem('token', '');
      this.$router.push('/login')
    },
  },
  setup() {
    return {
      avatar: avatar,
    }
  },
}
</script>
