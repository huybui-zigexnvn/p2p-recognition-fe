<template>
  <CDropdown variant="nav-item">
    <CDropdownToggle placement="bottom-end" class="py-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader component="h6" class="bg-light fw-semibold py-2">
        {{ $t('header.settings') }}
      </CDropdownHeader>
      <CDropdownItem @click="profile" class="hover-pointer"> <CIcon icon="cil-user" /> {{ $t('header.profile') }} </CDropdownItem>
      <CDropdownItem class="hover-pointer"> <CIcon icon="cil-settings" /> {{ $t('header.settings') }} </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout" class="hover-pointer"> <CIcon icon="cil-lock-locked" /> {{ $t('header.logout') }} </CDropdownItem>
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
      this.$router.push({ name: 'login'})
    },
    profile() {
      this.$router.push({ name: 'profile' })
    }
  },
  setup() {
    return {
      avatar: avatar,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/app_header_dropdown'
</style>
