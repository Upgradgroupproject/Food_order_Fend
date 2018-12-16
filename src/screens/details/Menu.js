import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: '360px',
      backgroundColor: theme.palette.background.paper,
    },
  });
  
  function ListDividers(props) {
    const { classes } = props;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button>
          <i class="fa fa-circle" aria-hidden="true"></i>
            <ListItemText primary="" />
            <i class="fa fa-inr" aria-hidden="true"></i>
          </ListItem>
          <Divider />
          <ListItem button divider>
          <i class="fa fa-circle" aria-hidden="true"></i>
            <ListItemText primary="" />
            <i class="fa fa-inr" aria-hidden="true"></i>
          </ListItem>
          <ListItem button>
          <i class="fa fa-circle" aria-hidden="true"></i>
            <ListItemText primary="" />
            <i class="fa fa-inr" aria-hidden="true"></i>
          </ListItem>
          <Divider light />
          <ListItem button>
          <i class="fa fa-circle" aria-hidden="true"></i>
            <ListItemText primary="" />
            <i class="fa fa-inr" aria-hidden="true"></i>
          </ListItem>
        </List>
      </div>
    );
  }
  
  ListDividers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
  <a href="" class="btn btn-primary" aria-label="View items in your shopping cart">
  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
</a>
const styles = theme => ({
    close: {
      padding: theme.spacing.unit / 2,
    },
  });
  
  class ConsecutiveSnackbars extends React.Component {
    queue = [];
  
    state = {
      open: false,
      messageInfo: {},
    };
  
    handleClick = message => () => {
      this.queue.push({
        message,
        key: new Date().getTime(),
      });
  
      if (this.state.open) {
        // immediately begin dismissing current message
        // to start showing new one
        this.setState({ open: false });
      } else {
        this.processQueue();
      }
    };
  
    processQueue = () => {
      if (this.queue.length > 0) {
        this.setState({
          messageInfo: this.queue.shift(),
          open: true,
        });
      }
    };
  
    handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ open: false });
    };
  
    handleExited = () => {
      this.processQueue();
    };
  
    render() {
      const { classes } = this.props;
      const { message, key } = this.state.messageInfo;
      return (
        <div>
          <Button onClick={this.handleClick('Item added to cart!')}>Show Item added to cart!</Button>
          <Snackbar
            key={key}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
            onExited={this.handleExited}
            ContentProps={{
              'aria-describedby': 'message-id',
            }
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </div>
      );
    }
  }
  
  ConsecutiveSnackbars.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ConsecutiveSnackbars);
  export default withStyles(styles)(ListDividers);
