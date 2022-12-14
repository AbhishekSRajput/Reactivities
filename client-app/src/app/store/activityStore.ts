import { action, makeObservable, observable, runInAction } from "mobx"
import agent from "../api/agent"
import { IActivity } from "../models/activity"
import { v4 as uuid } from 'uuid'

class ActivityStore {
  activities: IActivity[] = []
  activityRegistry = new Map<string, IActivity>()
  selectedActivity: IActivity | undefined = undefined
  editMode = false
  loading = false
  loadingInitial = true

  constructor() {
    makeObservable(this, {
      activities: observable,
      selectedActivity: observable,
      editMode: observable,
      loading: observable,
      loadingInitial: observable,
      loadActivities: action,
      setLoadingInitials: action,
      selectActivity: action,
      cancelSelectedActivity: action,
      openForm: action,
      closeForm: action,
      createActivity: action,
      updateActivity: action,
      deleteActivity: action
    })
  }
  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list()
      activities.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        this.activityRegistry.set(activity.id, activity)
      });
      this.setLoadingInitials(false)
    } catch (error) {
      console.log('Initial Loading')
      this.setLoadingInitials(false)
    }
  }

  setLoadingInitials = (state: boolean) => {
    this.loadingInitial = state
  }

  selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id)
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity()
    this.editMode = true
  }

  closeForm = () => {
    this.editMode = false
  }

  createActivity = async (activity: IActivity) => {
    this.loading = true
    activity.id = uuid()

    try {
      await agent.Activities.create(activity)
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
        this.loading = false
      })
    } catch (error) {
      console.log('error message', error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
  updateActivity = async (activity: IActivity) => {
    this.loading = true
    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity)
        this.selectedActivity = activity
        this.editMode = false
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
  deleteActivity = async (id: string) => {
    this.loading = true
    try {
      await agent.Activities.delete(id)
      runInAction(() => {
        this.activityRegistry.delete(id)
        if (this.selectedActivity?.id === id) this.cancelSelectedActivity()
        this.loading = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loading = false
      })
    }
  }
}

export default ActivityStore