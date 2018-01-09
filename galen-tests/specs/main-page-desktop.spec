@objects
    Header css .Header
    Logo css .Header-Logo
    CreateButton css .Header-Button
    DatePicker css .DatePicker
    RoomGroupListWrapper css .MainPage-RoomGroupListWrapper
    RoomEventList css .MainPage-RoomEventListWrapper
    RoomGroupList css .RoomGroupList
    Timeline css .Timeline

= Header =
    Header:
        inside screen 0px top
        width 100% of screen/width
        height 72px

    Logo:
        width 175px
        height 24px
        inside Header 24px left, 25px top

    CreateButton:
        inside Header ~24px right, 18px top
        width 140px
        height 36px

= Body =
    DatePicker:
        below Header 11px
        inside screen 24px left
        width 197px

    RoomGroupListWrapper:
        below DatePicker 11px
        inside screen 0px left
        width 245px
    
    RoomGroupList:
        inside RoomGroupListWrapper 25px left, 23px top

    RoomEventList:
        below Header 0px

    Timeline:
        below Header 0px
        height 46px