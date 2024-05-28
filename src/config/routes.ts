//to avoid hashcode
const routes = {
    index: '/',
    todo: '/todo',
    mailContent: '/mail-box/content',
    mailSearch: '/mail-box/search',
    newEmail: '/mail-box/content/newEmail',
    sendEmail: '/mail-box/send',
    sortByTime: '/mail-box/sort/byTime',
    sortByTime_shorthan: '/sort/byTime',
    trashMail: '/mail-box/trash',
    createpost: '/createpost',
    profile: '/:username',
    reservation: '/reservation',
    search: '/search',
    video: '/video',
    comment: '/comment/:idBaiViet',
    myInfo: '/my-info/:username',
};

export default routes;
