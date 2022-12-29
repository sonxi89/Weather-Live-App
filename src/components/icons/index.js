import { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-context'
import { Icon } from '@ui-kitten/components'

import { StyleSheet } from 'react-native'

import globalStyles from '../../constants/index'

const SearchIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="search"
            {...props}
            style={globalStyles.sizeIcon}
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
        />
    )
}

const ShareIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="share-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

const MenuIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="menu-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

const BackIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="arrow-back-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

const SettingIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="settings-2-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon Chỉ số UV
const SunIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="sun-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon Tầm nhìn
const EyeIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="eye-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon Chỉ số độ ẩm
const DropletIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="droplet"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon Chỉ số cảm giác như
const ThermometerIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="thermometer"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon Chỉ số điểm sương
const ThermometerPlusIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="thermometer-plus"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon Chỉ số áp suất
const PressureIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="compass-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

// Icon 3 chấm
const MoreVerticalIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="more-vertical"
            // fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            fill="#ffffff"
            {...props}
        />
    )
}

const ExpandIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="arrow-right"
            fill={theme === 'light' ? '#4A4A4A' : '#808080'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

const UserIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="person"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

const NavigationIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="navigation-outline"
            fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            {...props}
        />
    )
}

const TrashIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="trash-2-outline"
            // fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            fill="#ffffff"
            {...props}
        />
    )
}

const PinIcon = (props) => {
    const { theme } = useContext(ThemeContext)
    return (
        <Icon
            name="pin-outline"
            // fill={theme === 'light' ? '#222b45' : '#ffffff'}
            style={globalStyles.sizeIcon}
            fill="#ffffff"
            {...props}
        />
    )
}

export {
    SearchIcon,
    ShareIcon,
    MenuIcon,
    ExpandIcon,
    MoreVerticalIcon,
    PressureIcon,
    BackIcon,
    SettingIcon,
    SunIcon,
    EyeIcon,
    DropletIcon,
    ThermometerIcon,
    ThermometerPlusIcon,
    UserIcon,
    NavigationIcon,
    TrashIcon,
    PinIcon,
}
