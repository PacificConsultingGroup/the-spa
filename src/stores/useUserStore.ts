import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        personId: null as number | null,
        personUuid: '',
        ssoId: '',
        email: '',
        mobileNo: '',
        firstName: '',
        lastName: '',
        position: '',
        department: '',
        avatar: ''
    }),
    getters: {
        fullName(state) {
            return `${state.firstName} ${state.lastName}`;
        }
    },
    actions: {
        setUser(user: typeof this.$state) {
            this.personId = user.personId;
            this.personUuid = user.personUuid;
            this.ssoId = user.ssoId;
            this.email = user.email;
            this.mobileNo = user.mobileNo;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.position = user.position;
            this.department = user.department;
            this.avatar = user.avatar;
        }
    }
});