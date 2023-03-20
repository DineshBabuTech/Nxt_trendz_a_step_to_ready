import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {MdLocationOn, MdHeadsetMic} from 'react-icons/md'
import {FaBoxOpen} from 'react-icons/fa'
import {IoIosLock} from 'react-icons/io'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Account extends Component {
  state = {apiStatus: apiStatusConstants.initial, accountDetails: {}}

  componentDidMount() {
    this.getAccountDetails()
  }

  getAccountDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const data = {
        accountDetails: fetchedData.profile_details,
      }
      const updatedData = {
        name: data.accountDetails.name,
      }
      this.setState({
        accountDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderAccountDetailsView = () => {
    const {accountDetails} = this.state
    const {name} = accountDetails
    return (
      <>
        <Header />
        <div className="resp-cont">
          <div className="account-cont">
            <h1 className="account-heading">Hello, {name}</h1>
            <ul className="list-cont">
              <li className="address-cont">
                <MdLocationOn className="location" />
                <div>
                  <p className="text1">Your Addresses</p>
                  <p className="text2">Edit addresses for orders and gifts</p>
                </div>
              </li>
              <li className="address-cont">
                <FaBoxOpen className="order" />
                <div>
                  <p className="text1">Your Orders</p>
                  <p className="text2">Track, return or buy things again</p>
                </div>
              </li>
              <li className="address-cont">
                <IoIosLock className="login" />
                <div>
                  <p className="text1">Login & Security</p>
                  <p className="text2">
                    Edit username, password and mobile number
                  </p>
                </div>
              </li>
              <li className="address-cont">
                <MdHeadsetMic className="contact" />
                <div>
                  <p className="text1">Contact Us</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="account-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAccountDetailsView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Account
