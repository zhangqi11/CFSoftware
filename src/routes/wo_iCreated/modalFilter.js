import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ToastAndroid,
} from 'react-native';
import ModalPage from '../../components/ModalPage';
import BlockSelect from '../../components/BlockSelect';
import styleModule from './indexStyle';

const styles = StyleSheet.create(styleModule);

const ModalFilter = ({ navigation, onSubmit, woProductItems }) => {
    const filterOptions = [
        { code: -2, text: '全部' },
        { code: 1, text: '未处理' },
        { code: 2, text: '处理中' },
        { code: 3, text: '已解决' },
        { code: 4, text: '已关闭' },
    ];
    const filterProducts = woProductItems.concat();
    filterProducts.unshift({ productcode: '-1', productname: '全部' });

    function handleSubmit(close) {
        const { state } = navigation;
        if (state.params && state.params.filter) {
            onSubmit();
            // 关闭模态框
            close();
        } else {
            ToastAndroid.show('请选择筛选条件', 3000);
        }
    }

    return (
        <ModalPage
            navigation={navigation}
            title="按条件筛选"
            onSubmit={handleSubmit}
        >
            <ScrollView style={{ alignSelf: 'stretch' }}>
                <View style={styles.modalContentTitleLayout}>
                    <Text style={styles.modalContentTitleText}>工单处理状态</Text>
                </View>
                <BlockSelect
                    fieldName="wStateClient"
                    navigation={navigation}
                    filterOptions={filterOptions}
                    itemMap={{
                        itemCode: 'code',
                        itemText: 'text',
                    }}
                />
                <View style={styles.modalContentTitleLayout}>
                    <Text style={styles.modalContentTitleText}>项目产品名称</Text>
                </View>
                <BlockSelect
                    fieldName="productId"
                    navigation={navigation}
                    filterOptions={filterProducts}
                    itemMap={{
                        itemCode: 'productcode',
                        itemText: 'productname',
                    }}
                />
            </ScrollView>
        </ModalPage>
    );
};

ModalFilter.propTypes = {
    navigation: PropTypes.object.isRequired,
    woProductItems: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};


export default ModalFilter;
