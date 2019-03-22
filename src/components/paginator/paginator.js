import React from 'react';
import PropTypes from 'prop-types';

import { Button, Icon } from 'semantic-ui-react';

export default class Paginator extends React.PureComponent {
    static propTypes = {
        currentPage: PropTypes.number.isRequired,
        numOfItems: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        config: PropTypes.object.isRequired,
        actions: PropTypes.shape({
            setCurrentPage: PropTypes.func.isRequired
        }).isRequired
    };

    render() {
        const { currentPage, itemsPerPage, numOfItems, config, actions: { setCurrentPage } } = this.props;
        const { capabilities: { reorderable } } = config;

        if (!itemsPerPage || reorderable) {
            return null;
        }


        const numOfPages = Math.ceil(numOfItems / itemsPerPage);

        if (currentPage > numOfPages) {
            setCurrentPage(currentPage - 1);
        }

        const onFirstPage = currentPage === 1;
        const onLastPage = currentPage === numOfPages;

        if (numOfPages <= 1 || !itemsPerPage) {
            return null;
        }

        return (
            <div style={{margin: '20px 0', textAlign: 'center'}}>
                <Button.Group>
                    <Button disabled={onFirstPage} icon onClick={() => setCurrentPage(currentPage - 1)}><Icon name="chevron left" /></Button>
                    {
                    [...Array(numOfPages)].map((e, i) => {
                        return (
                            <Button key={`page-${i}`} color={currentPage === i + 1 ? 'blue' : null} onClick={() => setCurrentPage(i + 1)}>{i + 1}</Button>
                        );
                    })
                    }
                    <Button disabled={onLastPage} icon onClick={() => setCurrentPage(currentPage + 1)}><Icon name="chevron right" /></Button>
                </Button.Group>
            </div>
        );
    }
}