import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Image, SectionList } from 'react-native';
import { connect } from 'react-redux';
import deviceInfo from 'react-native-device-info';
import InstructionOption from './instructionListOption';
import ItemSeparator from '../../components/ItemSeparator';
import { fetchInstructionOptions } from '../../services/menuOptions';
import styleModule from './indexStyle';

const styles = StyleSheet.create(styleModule);

class Instruction extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { dispatch } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <View style={styles.logo}>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={{ width: 50, height: 50, tintColor: '#E26F26' }}
                            resizeMethod="scale"
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                fontWeight: 'bold',
                                lineHeight: 30,
                                color: '#9C9C9C',
                            }}
                        >
                            才丰服务平台 {deviceInfo.getVersion()}
                        </Text>
                    </View>
                    <SectionList
                        sections={fetchInstructionOptions()}
                        renderItem={({ item }) => (
                            <InstructionOption item={item} dispatch={dispatch} />
                        )}
                        ItemSeparatorComponent={() => (
                            <ItemSeparator
                                backgroundColor="#ffffff"
                                border={1}
                                lineColor="rgba(139,139,139,0.3)"
                                marginHorizontal={15}
                            />
                        )}
                        SectionSeparatorComponent={() => <View style={{ height: 10 }} />}
                    />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>南京才丰软件技术开发有限公司 版权所有</Text>
                    <Text style={styles.footerText}>Copyright ©2016-2017 CAI FENG</Text>
                    <Text style={styles.footerText}>All rights reserved</Text>
                </View>
            </View>
        );
    }
}

Instruction.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(Instruction);